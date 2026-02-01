import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PersonalPlanSwiper from "../../components/swiper/PersonalPlanSwiper";

import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { formatDate, getOrderPeriodText } from "../../utils/filter";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PAYMENT_MAP = {
  credit_card: {
    iconName: "credit_card",
    text: "信用卡",
  },
  mobile: {
    iconName: "mobile_arrow_right",
    text: "行動支付",
  },
};

export default function Plan() {
  const historyOrders = useSelector((state) => state.user.historyOrders);
  const activeOrder = useSelector((state) => state.user.activeOrder);
  const plan = useSelector((state) => state.user.plan);
  const paymentMethod = useSelector((state) => state.user.paymentMethod);

  // const [plans, setPlans] = useState([]);

  // const getPlans = async () => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}plans`);
  //     setPlans(res.data);
  //   } catch (error) {
  //     alert(error.response?.data.message || "無法取得訂閱方案");
  //   }
  // };

  // useEffect(() => {
  //   getPlans();
  // }, []);

  return (
    <>
      <div className="px-1 px-lg-6 pt-6 pb-10 ">
        <div className="mb-10">
          <Link
            to="/user"
            className="link-gray-600 fs-s fs-md-m py-1 py-md-2 ps-0 pe-2 px-md-4 mb-4 mb-md-10"
          >
            <span className="material-symbols-outlined align-bottom fs-m fs-md-2xl me-2_5 me-md-3">
              arrow_back_ios
            </span>
            返回個人儀表板
          </Link>
          <div className="d-flex align-items-center pb-6 border-bottom border-gray-200">
            <h1 className="fs-2xl fs-md-3xl me-2 me-md-6">個人方案</h1>
            <div className="d-flex fs-xs fs-md-m text-gray-600">
              <span className="fw-bold text-secondary me-1">
                {plan ? `${plan.title} ${plan.subtitle}` : "Free 免費方案"}
              </span>
              <div className="d-none d-md-block">
                於
                <span className="fw-bold text-secondary mx-1">
                  {formatDate(activeOrder?.nextBillingDate) || "-"}
                </span>
                自動續訂
              </div>
            </div>

            <Link
              to="/account/plan/detail"
              className="link-gray-600 py-2 px-4 ms-auto"
            >
              方案明細
              <span className="material-symbols-outlined align-bottom ms-1 d-none d-md-inline-block">
                arrow_right_alt
              </span>
            </Link>
          </div>
        </div>

        {/* 訂閱方案內容 */}
        <div className="mb-10">
          <PersonalPlanSwiper />
        </div>

        {/* 付款資訊 */}
        <section>
          <div className="card border-0 border-md border-gray-200 rounded-4">
            <div className="card-body p-0 p-md-6">
              <h2 className="fs-l fs-md-xl text-gray-1000 lh-sm mb-6">
                付款資訊
              </h2>
              <p className="text-gray-600 mb-3">
                下次付款日期：
                <span>
                  {activeOrder?.isAutoRenew
                    ? formatDate(activeOrder?.nextBillingDate)
                    : "--"}
                </span>
              </p>
              <div className="d-flex flex-column flex-md-row align-items-md-center gap-3 pb-6 border-bottom mb-6">
                <div
                  className={`text-gray-600 mb-3 d-flex flex-column flex-md-row ${paymentMethod && "gap-3"}`}
                >
                  <div>付款方式：</div>
                  <div>
                    {paymentMethod && (
                      <>
                        <span className="material-symbols-outlined align-bottom me-1">
                          {PAYMENT_MAP[paymentMethod.type]?.iconName}
                        </span>
                        <span className="me-2">
                          {PAYMENT_MAP[paymentMethod.type]?.text ||
                            paymentMethod.type}
                        </span>
                        <span>{`**** **** ${paymentMethod.last4}`}</span>
                      </>
                    )}
                  </div>
                </div>
                <button type="button" className="btn btn-outline-primary">
                  管理
                </button>
              </div>
              <button
                type="button"
                className="btn w-100 p-0 border-0 payment-toggle"
                data-bs-toggle="collapse"
                data-bs-target="#payment-record-collapse"
                aria-expanded="true"
                aria-controls="payment-record-collapse"
              >
                <div className="text-gray-600 d-flex align-items-center gap-2">
                  <span>付款紀錄</span>
                  <span className="material-symbols-outlined icon-collapsed">
                    keyboard_arrow_down
                  </span>
                  <span className="material-symbols-outlined icon-expanded">
                    keyboard_arrow_up
                  </span>
                </div>
              </button>
              <div className="collapse show" id="payment-record-collapse">
                <div className="my-6">
                  {!!historyOrders.length && (
                    <div className="table-scroll scrollbar-none">
                      <div className="payment-table-frame border border-gray-200 rounded-2 w-100 overflow-hidden">
                        <table className="table align-middle mb-0 payment-record">
                          <thead>
                            <tr>
                              <th scope="col">付款日期</th>
                              <th scope="col">付款內容</th>
                              <th scope="col">付款方式</th>
                              <th scope="col">發票</th>
                              <th scope="col">帳單金額</th>
                            </tr>
                          </thead>
                          <tbody>
                            {historyOrders.map((order) => (
                              <tr key={order.id}>
                                <td>
                                  {formatDate(order.subscribeDate, "slash")}
                                </td>
                                <td>{getOrderPeriodText(order)}</td>
                                <td>
                                  <span className="material-symbols-outlined align-bottom me-1">
                                    {
                                      PAYMENT_MAP[order.paymentMethod.type]
                                        .iconName
                                    }
                                  </span>
                                  {PAYMENT_MAP[order.paymentMethod.type].text}
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                  >
                                    檢視
                                  </button>
                                </td>
                                <td>NT$ {order.plan.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-center text-gray-400">已無更早的付款紀錄</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
