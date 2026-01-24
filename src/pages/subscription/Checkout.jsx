import { useParams } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { PatternFormat } from "react-number-format";
import { useEffect, useState } from "react"
import axios from "axios";
import Validation from "./Validation"

const Checkout = () => {
  const [plans, setPlans] = useState([]);
  const { id } = useParams(); 
  const [step, setStep] = useState(1);
  const {time, setTime} = useState([]);

  
  // 取得 URL 參數 (例如 ?plan=1 顯示 data[0])
  const targetIndex = parseInt(id, 10);
  const currentPlan = plans[targetIndex];


  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(Validation),
    defaultValues: { isAutoRenew: true, agreedToTerms: true }
  });

  useEffect(() => {
    axios.get('http://localhost:3000/plans').then(res => setPlans(res.data));
  }, []);

  // --- 日期與格式工具 ---
  const getDates = () => {
    const now = new Date();
    const next = new Date(now);
    next.setMonth(now.getMonth() + 1);
    if (next.getDate() !== now.getDate()) next.setDate(0); // 月底溢位修正

    return {
      subTS: Math.floor(now.getTime() / 1000),
      nextTS: Math.floor(next.getTime() / 1000),
      // display: `${next.getFullYear()}年${next.getMonth() + 1}月${next.getDate()}日`,
    };
  };

  const formatChineseDate = () => {
    const now = new Date();
    const next = new Date(now);
    next.setMonth(now.getMonth() + 1);
    if (next.getDate() !== now.getDate()) next.setDate(0);

    return {
      nextDay: `${next.getFullYear()}年${next.getMonth() + 1}月${next.getDate()}日`,
      nowDay: `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
    };
  };
const { nextDay, nowDay } = formatChineseDate();
  // --- 統一結帳發送邏輯 ---
  const executeOrder = async (cardData, modeLabel) => {
    const { subTS, nextTS, display } = getDates();
    const pmId = `pm-${Date.now()}`;
    const orderId = `ord-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random()*1000)}`;

    try {
      // 1. 先建立支付方式 (paymentMethods)
      const newPaymentMethod = {
        id: pmId,
        userId: 101, // 假設當前使用者 ID
        brand: cardData.brand || "VISA",
        type: "credit_card",
        cardHolder: cardData.cardHolder || "使用者名稱",
        last4: cardData.number.slice(-4),
        expDate: cardData.expDate || "12/28"
      };
      await axios.post('http://localhost:3000/paymentMethods', newPaymentMethod);

      // 2. 再建立訂單紀錄 (orders)
      const newOrder = {
        id: orderId,
        planId: plans[targetIndex]?.subtitle || "plan_pro_month",
        userId: 101,
        price: plans[targetIndex]?.price || 0,
        subscribeDate: subTS,
        nextBillingDate: nextTS,
        isAutoRenew: true,
        agreedToTerms: true,
        status: "active",
        paymentMethodId: pmId // 關聯剛剛建立的 PM ID
      };
      await axios.post('http://localhost:3000/orders', newOrder);

      getOrderHistory(newOrder.id)
      // alert(`【${modeLabel}】付款成功！\n下次扣款日：${display}`);
    } catch (err) {
      console.error("交易失敗", err);
    }
  };

  // 模擬：讀取訂單並顯示關聯的卡片末四碼
  const getOrderHistory = async (orderId) => {
    // 1. 取得訂單資料
    const orderRes = await axios.get(`http://localhost:3000/orders/${orderId}`);
    const order = orderRes.data;

    // 2. 根據訂單中的 paymentMethodId 取得卡片資訊
    const pmRes = await axios.get(`http://localhost:3000/paymentMethods/${order.paymentMethodId}`);
    const payment = pmRes.data;

    console.log(`訂單編號：${order.id}`);
    console.log(`方案：${order.planId}`);
    console.log(`支付卡片：${payment.brand} **** ${payment.last4}`);
  };

  // --- 模式 A: 信用卡輸入 ---
  const handleManualPay = (data) => {
    const manualCard = { 
      number: data.cardNumber, 
      cardHolder: data.cardHolder, 
      brand: "credit_card",
      expDate: data.expDate 
    };
    executeOrder(manualCard, "信用卡手動付款");
  };

  // --- 模式 B: 藍新模擬支付 ---
  const handleNewebPaySim = () => {
    // 藍新模擬：直接帶入預設資料
    const mockNewebCard = { number: "4000221111111111", cardHolder: "NEWEBPAY USER", brand: "MASTERCARD", expDate: "12/28" };
    executeOrder(mockNewebCard, "藍新支付模擬");
  };

  if (!plans[targetIndex]) return <div>載入中...</div>;

return (
  <div className="container">
    <h1 className="fs-md-5xl fs-4 pb-6 border-bottom mb-6 text-center">方案明細{id}</h1>
    <div className="row justify-content-center">
      <div className="col-md-8 mb-6">
        <div className="card shadow-sm border-0 custom-plan-card p-3">
          <div className="card-body">
            {/* {JSON.stringify(currentPlan)} */}
            <h2 className="card-title fw-bold border-bottom mb-3">{currentPlan.title}{currentPlan.subtitle}</h2>
            <p class="card-text">訂閱日期：{nowDay}</p>
            {/* {JSON.stringify(formatChineseDate())} */}
            <p className="card-text">自動續訂日期: {nextDay}</p>
            <p className="card-text mb-2">費用：{`NT${currentPlan.price}/${currentPlan.billing.unit}`}</p>
            <div className="accordion accordion-flush" id="planDetails">
              <div className="accordion-item">
                <h2 className="accordion-header d-flex flex-column">
                <button className="accordion-button px-0 py-0 fw-bold"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
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
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-md-6">
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
                      <input {...register('cvv')} id="CVV" type="text" className={`form-control ${errors.cvv ? 'is-invalid' : ''}`} placeholder="e.g 1234"/>
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
                    <button disabled={isSubmitting} type="submit" className="btn btn-dark py-3 fw-bold">{isSubmitting ? '處理中...' : 'PAY NOW'}</button>
                  </div>
                </form>
              </div>
              <div className="tab-pane" id="pane-newebpay" role="tabpanel">
                <h2>藍新 NewebPay</h2>
                <div>
                  {step === 1 && (
                    <button className="btn btn-primary" onClick={() => setStep(2)}>模擬跳轉藍新支付</button>
                  )}

                  {step === 2 && (
                    <div>
                      <h3>模擬藍新信用卡支付</h3>
                      {/* <p>訂單編號: {subscription.id}</p> */}
                      <button className="btn btn-primary" onClick={handleNewebPaySim}>確認刷卡 (Axios 觸發)</button>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="text-success">
                      <h4>✅ 訂閱已成功</h4>
                      <p>應付金額：{}</p>
                      <p>方案：相關訂閱資訊已maill到使用者的信箱</p>
                    </div>
                  )}
                </div>
                {/* <p className="text-muted small">請點擊下方 Pay Now 按鈕，系統將引導至第三方支付頁面。</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
  
};

export default Checkout;