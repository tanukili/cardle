import { Link } from "react-router-dom";
import PersonalPlanSwiper from "../../components/swiper/PersonalPlanSwiper";

import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Plan() {
  const [plans, setPlans] = useState([]);
  const [recommendedPlan, setRecommendedPlan] = useState("");
  const [currentPlan, setCurrentPlan] = useState("plan_pro_month");

  const getPlans = async () => {
    try {
      const res = await axios.get(`${BASE_URL}plans`);
      setPlans(res.data);
      // console.log(res.data);
    } catch (error) {
      alert(error.response?.data.message || "無法取得訂閱方案");
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

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
            <p className="d-flex fs-xs fs-md-m text-gray-600">
              <span className="fw-bold text-secondary me-1">Pro 年繳方案</span>
              <div className="d-none d-md-block">
                於
                <span className="fw-bold text-secondary mx-1">
                  2025年08月09日
                </span>
                自動續訂
              </div>
            </p>

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
                下次付款日期：<span>2025 年 08 月 31日</span>
              </p>
              <div className="d-flex flex-column flex-md-row align-items-md-center gap-3 pb-6 border-bottom mb-6">
                <div className="text-gray-600 mb-3 d-flex flex-column flex-md-row gap-3">
                  <div>付款方式：</div>
                  <div>
                    <span className="material-symbols-outlined align-bottom me-1">
                      credit_card
                    </span>
                    <span className="me-2">MasterCard</span>
                    <span>**** **** 1234</span>
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
                  {/* <div className="border border-gray-200 rounded-2 overflow-hidden">
                    <div className="table-scroll scrollbar-none"> */}
                  <div className="table-scroll scrollbar-none">
                    <div className="payment-table-frame border border-gray-200 rounded-2 overflow-hidden">
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
                          <tr>
                            <td>2025/07/09</td>
                            <td>2025/07/09 - 2025/08/08 Pro 月繳</td>
                            <td>
                              <span className="material-symbols-outlined align-bottom me-1">
                                credit_card
                              </span>
                              信用卡
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                              >
                                檢視
                              </button>
                            </td>
                            <td>NT$ 120</td>
                          </tr>
                          <tr>
                            <td>2024/07/09</td>
                            <td>2024/07/09 - 2025/07/08 Pro 年繳</td>
                            <td>
                              <span className="material-symbols-outlined align-bottom me-1">
                                credit_card
                              </span>
                              信用卡
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                              >
                                檢視
                              </button>
                            </td>
                            <td>NT$ 1,200</td>
                          </tr>
                          <tr>
                            <td>2404/06/09</td>
                            <td>2025/06/09 - 2025/07/08 Pro 月繳</td>
                            <td>
                              <span className="material-symbols-outlined align-bottom me-1">
                                mobile_arrow_right
                              </span>
                              行動支付
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                              >
                                檢視
                              </button>
                            </td>
                            <td>NT$ 120</td>
                          </tr>
                          <tr>
                            <td>2404/05/09</td>
                            <td>2025/05/09 - 2025/06/08 Pro 月繳</td>
                            <td>
                              <span className="material-symbols-outlined align-bottom me-1">
                                mobile_arrow_right
                              </span>
                              行動支付
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                              >
                                檢視
                              </button>
                            </td>
                            <td>NT$ 120</td>
                          </tr>
                          <tr>
                            <td>2404/04/09</td>
                            <td>2025/04/09 - 2025/05/08 Pro 月繳</td>
                            <td>
                              <span className="material-symbols-outlined align-bottom me-1">
                                credit_card
                              </span>
                              信用卡
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-outline-primary"
                              >
                                檢視
                              </button>
                            </td>
                            <td>NT$ 120</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
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
