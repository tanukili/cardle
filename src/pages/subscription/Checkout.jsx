import { useParams, useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { PatternFormat } from "react-number-format";
import { useEffect, useMemo, useState } from "react"
import axios from "axios";
import Validation from "../../components/checkout/Validation"
import { showSwalToast } from "@/utils/swalSetting";
import { useSelector } from "react-redux";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Checkout = () => {
const navigate = useNavigate();
const [plans, setPlans] = useState([]);
const { id } = useParams(); 
const [step, setStep] = useState(1);
const {time, setTime} = useState([]);
const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
const userInfo = useSelector((state) => state.user.userInfo);
console.log(isLoggedIn,userInfo);

// // 在組件內定義一個狀態來防止重複執行
const [isProcessing, setIsProcessing] = useState(false);
  
  let targetIndex = id;
  
  const currentPlan = useMemo(() => {
    return plans.find(p => p.id === targetIndex);
  }, [plans, targetIndex]);

  //驗證表單
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(Validation),
    defaultValues: { isAutoRenew: true, agreedToTerms: true }
  });

  useEffect(() => {
  if (!isLoggedIn) {
    navigate('/sign-up', { state: { from: location.pathname } });
  }
}, [isLoggedIn, navigate, location]);
  useEffect(() => {
    axios.get(`${BASE_URL}plans`).then(res => setPlans(res.data));
  }, []);

  // 計算未來日期
  const calculateNextDate = (planId) => {
  const now = new Date();
  const next = new Date(now);

 if (planId === "plan_pro_month" || planId === "plan_free") {
    next.setMonth(now.getMonth() + 1);
  } else if (planId === "plan_pro_year") {
    next.setMonth(now.getMonth() + 12);
  }

  // 月底溢位修正 (例如 1/31 加一個月變 3/3，修正回 2/28)
  if (next.getDate() !== now.getDate()) {
    next.setDate(0);
  }

  return { now, next };
};


  // 轉換為 Timestamp
  const getDates = (id) => {
  const { now, next } = calculateNextDate(id);;
    return {
      subTS: Math.floor(now.getTime() / 1000),
      nextTS: Math.floor(next.getTime() / 1000),
    };
  };

  // 換為中文格式
  const formatChineseDate = () => {
    const { now, next } = calculateNextDate(id);
    const formatDate = (d) => `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    return {
      nextDay: formatDate(next),
      nowDay: formatDate(now)
    };
  };
    const { nextDay, nowDay } = formatChineseDate();
    const getOrderHistory = async (orderId) => {
      // 1. 取得訂單資料
      const orderRes = await axios.get(`${BASE_URL}orders/${orderId}`);
      const order = orderRes.data;
      // 2. 根據訂單中的 paymentMethodId 取得卡片資訊
      const pmRes = await axios.get(`${BASE_URL}paymentMethods/${order.paymentMethodId}`);
      const payment = pmRes.data;
      console.log(payment);
      navigate(`/subscription/success/${orderId}`,{ state: { order: order, payment: payment } });
    };
// --- 結帳發送邏輯 ---
  const executeOrder = async (cardData, modeLabel) => {
    // 1. 雙重防護：檢查自定義鎖與 Hook Form 的提交狀態
    if (isProcessing || isSubmitting) return; 
    
    setIsProcessing(true); // 立即鎖定

    try {
      const { subTS, nextTS } = getDates(id);
      const userId = userInfo.id;
      const nowTS = subTS;
      const newPrice = currentPlan?.price || 0;
      const isNewPlanFree = newPrice === 0;

      // 2. 檢查舊訂單 (加上 limit=1 減少回應量)
      const activeRes = await axios.get(`${BASE_URL}orders?userId=${userId}&status=active`);
      // const activeOrders = activeRes.data;
      const oldOrder = activeRes.data[0];
      let refundInfo = null;
      if (oldOrder) {
        const oldPrice = oldOrder.price || 0;
        // console.log(oldOrder,oldPrice,isNewPlanFree);
        // 只有舊訂單是「有付錢的」，才需要計算退費
        if (oldPrice > 0) {
          const totalDuration = oldOrder.nextBillingDate - oldOrder.subscribeDate;
          const remaining = oldOrder.nextBillingDate - subTS;
          const amount = Math.max(0, Math.floor((oldPrice / totalDuration) * remaining));
          
          refundInfo = { amount, date: subTS };

          await axios.patch(`${BASE_URL}orders/${oldOrder.id}`, {
            status: "inactive",
            refundDetail: { ...refundInfo, reason: "方案更換退費" }
          });
        } else {
          // 如果舊的是免費方案，直接標註為取代
          await axios.patch(`${BASE_URL}orders/${oldOrder.id}`, { status: "replaced" });
        }
      }

      // 3. 建立支付方式 (ID 加上隨機數防止極短時間內產出的 ID 重複)
      const pmId = `pm-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      let paymentObj = { brand: "FREE", last4: "NONE", cardHolder: "Member" };
      if (!isNewPlanFree) {
        const paymentObj = {
          id: pmId,
          userId,
          brand: cardData.brand || "VISA",
          type: "credit_card",
          cardHolder: cardData.cardHolder || "Member",
          last4: cardData.number?.slice(-4) || "0000",
          expDate: cardData.expDate
        };
        await axios.post(`${BASE_URL}paymentMethods`, paymentObj);
      }

      // 4. 建立新訂單
      const orderId = `ord-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000)}`;
      const newOrder = {
        id: orderId,
        planId: currentPlan?.id || "plan_pro_month",
        userId,
        price: currentPlan?.price || 0,
        subscribeDate: subTS,
        nextBillingDate: nextTS,
        isAutoRenew: true,
        agreedToTerms: true,
        status: "active",
        paymentMethodId: pmId
      };
      const orderRes = await axios.post(`${BASE_URL}orders`, newOrder);

      const savedOrder = orderRes.data;
      // 5. 成功後邏輯
      showSwalToast({title:`${modeLabel}付款成功`})
      if (refundInfo?.amount > 0) {
        showSwalToast({ title: `訂閱成功！舊方案剩餘的 $${refundInfo.amount} 元將退回您的帳戶。`});
      } else {
        showSwalToast({title: isNewPlanFree ? "免費方案已成功開通！" : "付費方案訂閱成功！"})
      }
      navigate(`/subscription/success/${orderId}`, { 
        state: { 
          order: savedOrder,   // 新訂單資訊
          payment: paymentObj  // 剛才組好的支付資訊
        } 
      });
      // getOrderHistory(newOrder.id);

    } catch (err) {
      console.error("結帳失敗：", err);
      showSwalToast("結帳過程發生錯誤，請稍後再試")
      setIsProcessing(false); // 只有失敗才解鎖，成功就直接導走了
    }
  };
  // --- 模式 A: 信用卡輸入 ---
  const handleManualPay = (data) => {
    const manualCard = { 
      number: data.cardNumber, 
      cardHolder: data.cardHolder, 
      brand: "credit_card",
      expDate: data.expDate 
    };
    executeOrder(manualCard, "信用卡付款");
  };

  // --- 模式 B: 藍新模擬支付 ---
  const handleNewebPaySim = () => {
    // 藍新模擬：直接帶入預設資料
    const mockNewebCard = { number: "4000221111111111", cardHolder: "NEWEBPAY USER", brand: "MASTERCARD1", expDate: "12/28" };
    executeOrder(mockNewebCard, "藍新支付");
  };

 if (!currentPlan) return <div>載入方案中...</div>;

return (
  <div className="container px-6 py-6">
    <h1 className="fs-md-5xl fs-4 pb-6 border-bottom mb-6 text-center">方案明細{userInfo.name}</h1>
    <div className="row justify-content-center">
      <div className="col-md-8 mb-6">
        <div className="card shadow-sm border-0 custom-plan-card p-3">
          <div className="card-body p-6 p-md-8">
            <h2 className="card-title fw-bold pb-4 mb-6 border-bottom">{currentPlan.title} {currentPlan.subtitle}</h2>
            <div className="mb-10">
              <p className="card-text mb-2">訂閱日期：{nowDay}</p>
              <p className="card-text mb-2">自動續訂日期: {nextDay}</p>
              <p className="card-text">費用：{`NT${currentPlan.price}/${currentPlan.billing?.unit}`}</p>
            </div>
           {currentPlan?.price !== 0?( <div className="accordion accordion-flush" id="planDetails">
              <div className="accordion-item">
                <h2 className="accordion-header d-flex flex-column">
                <button className="accordion-button px-0 py-0 fw-bold mb-4"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                  方案功能與上限說明
                </button>
                <hr className="my-0"/>
                </h2>
              <div id="collapseOne" className="accordion-collapse collapse show">
                <div className="accordion-body px-0 pt-3">
                  <ol className="list-group list-group-numbered list-group-flush small">
                    {
                      currentPlan.featuresDetail.map((item,i)=>(
                        <li key={item.key} className="list-group-item border-0 px-0 plan-list-item">
                          <strong>{item.title}: </strong>{item.description}
                        </li>
                      ))
                    }
                </ol>
                </div>
              </div>
              </div>
            </div>):(<button 
            className="btn btn-primary"
            onClick={() => executeOrder({}, "免費開通")}
            disabled={isProcessing}
          >
            {isProcessing ? "處理中..." : "確認轉換"}
          </button>)}
          </div>
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-md-6">
        {currentPlan?.price !== 0 ?(
        <div className="card border-0 shadow-sm mx-auto p-3">
          <div className="card-body">
            <h3 className="text-center mb-4 fw-bold">請輸入付款資訊</h3>
            <div className="mb-4">
              <label className="form-label fw-bold">付款方式</label>
              <ul className="nav nav-pills border rounded overflow-hidden d-flex" id="paymentTab" role="tablist">
                <li className="nav-item flex-fill text-center w-50" role="presentation">
                  <button className="nav-link active w-100 rounded-0 py-2 btn-payment" id="credit-tab" data-bs-toggle="pill" data-bs-target="#pane-credit" type="button" role="tab">信用卡</button>
                </li>
                <li className="nav-item flex-fill text-center w-50" role="presentation">
                  <button className="nav-link w-100 rounded-0 py-2 btn-payment" id="newebpay-tab" data-bs-toggle="pill" data-bs-target="#pane-newebpay" type="button" role="tab">藍新 NewebPay</button>
                </li>
              </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane show active" id="pane-credit" role="tabpanel">
                <form onSubmit={handleSubmit(handleManualPay)}>
                  <div className="mb-3">
                    <label htmlFor="cardUser" className="form-label fw-bold">持卡人姓名</label>
                    <input {...register('cardHolder')} id="cardUser" type="text" className={`form-control ${errors.cardHolder ? 'is-invalid' : ''}`} placeholder="e.g John Doe"/>
                    {errors.cardHolder && (
                      <p className="invalid-feedback">
                        {errors.cardHolder.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cardNum" className="form-label fw-bold">信用卡號</label>
                    <div className={`input-group custom-focus-group ${errors.cardNumber ? 'is-invalid' : ''}`}>
                      <span className="input-group-text bg-gray-0 border-end-0">
                        <i className="bi bi-credit-card"></i>
                      </span>
                        <Controller
                          name="cardNumber"
                          control={control}
                          render={({ field: { onChange, name, value } }) => (
                            <PatternFormat
                              format="#### #### #### ####" // 定義顯示格式
                              mask="_"                      // 未輸入時顯示的底線（選用）
                              className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                              placeholder="1234 1234 1234 1234"
                              value={value}
                              onValueChange={(values) => {
                                // values.value 是純數字（例如 "12345678"）
                                // 要把純數字傳回給 react-hook-form 驗證
                                onChange(values.value); 
                              }}
                            />
                          )}
                        />
                    </div>
                      {errors.cardNumber && (
                        <p className="invalid-feedback">{errors.cardNumber?.message}</p>
                      )}
                  </div>
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label htmlFor="EXDate" className="form-label fw-bold">Exp Date</label>
                      <input {...register('expDate')} id="EXDate" type="text" className={`form-control ${errors.expDate ? 'is-invalid' : ''}`} placeholder="MM/YY"/>
                      {errors.expDate && (
                        <p className="invalid-feedback">{errors.expDate?.message}</p>
                      )}
                    </div>
                    <div className="col-6">
                      <label htmlFor="CVV" className="form-label fw-bold">CVV</label>
                      <input {...register('cvv')} id="CVV" type="text" className={`form-control ${errors.cvv ? 'is-invalid' : ''}`} placeholder="e.g 123"/>
                      {errors.expDate && (
                      <p className="invalid-feedback">{errors.cvv?.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="form-check form-check-inline small">
                      <input {...register('agreedToTerms')} className="form-check-input" type="checkbox" id="terms"/>
                      <label className="form-check-label" htmlFor="terms">同意服務條款</label>
                      <p>{errors.agreedToTerms?.message}</p>
                    </div>
                    <div className="form-check form-check-inline small">
                      <input {...register('isAutoRenew')} className="form-check-input" type="checkbox" id="autoRenew"/>
                      <label className="form-check-label" htmlFor="autoRenew">我同意自動續訂</label>
                    </div>
                  </div>
                  <div className="d-grid">
                    <button disabled={isSubmitting || isProcessing} type="submit" className="btn btn-dark py-3 fw-bold">{(isSubmitting || isProcessing) ? '處理中...' : 'PAY NOW'}</button>
                  </div>
                </form>
              </div>
              <div className="tab-pane" id="pane-newebpay" role="tabpanel">
                <h2>藍新 NewebPay</h2>
                <div>
                  {step === 1 && (
                    <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>模擬跳轉藍新支付</button>
                  )}

                  {step === 2 && (
                    <div>
                      <h3>模擬藍新信用卡支付</h3>
                      <button type="button" className="btn btn-primary" onClick={handleNewebPaySim}>確認刷卡 (Axios 觸發)</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>):(
          <>
          <h3>您正準備切換至免費方案</h3>
          <p>舊有的付費比例將自動退還至您的原帳戶。</p>
          </>)}
      </div>
    </div>
  </div>)
  
};

export default Checkout;