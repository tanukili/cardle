import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BASE_URL = "http://localhost:3000";

export default function PlanSwiper() {
  const [plans, setPlans] = useState([]);
  const [recommendedPlan, setRecommendedPlan] = useState("plan_pro_month");

  const getPlans = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/plans`);
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
      <div>
        {/* Swiper 主容器 */}
        <Swiper
          className="plan-swiper h-100"
          initialSlide={1}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={24}
          centerInsufficientSlides={true}
          centeredSlidesBounds={true}
          resistanceRatio={0}
          watchOverflow={true}
          breakpoints={{ 992: { spaceBetween: 40 } }}
        >
          {/* 多個 Slides */}
          {plans.map((plan) => (
            <SwiperSlide key={plan.id} className="swiper-slide h-auto">
              <div
                className={`bg-gray-0 p-6 border ${plan.id === recommendedPlan ? " border-2 border-secondary" : "border-gray-100"} rounded-4 d-flex flex-column h-100`}
              >
                <div>
                  {/* 方案名稱 */}
                  <div className="pb-6 border-bottom border-gray-400 mb-8">
                    <div className="d-flex justify-content-between mb-6">
                      <span className="badge bg-secondary text-gray-0 border border-gray-500 px-md-4 fs-s fs-md-l">
                        {plan.title}
                      </span>
                      <span className="fs-s fs-md-l fw-bold text-gray-500">
                        {plan.subtitle}
                      </span>
                    </div>
                    <h3>
                      <span className="text-gray-1000 fs-4xl fs-md-5xl">
                        NT$ {plan.price}
                      </span>
                      <span className="text-gray-500 lh-base fw-normal fs-m fs-md-xl">
                        / {plan.billing?.unit}
                      </span>
                    </h3>
                  </div>
                  {/* 方案內容 */}
                  <ul className="list-unstyled mb-8">
                    {plan.featuresShort.map((feature, index) => (
                      <li key={index} className="mb-3">
                        <span
                          className={`material-symbols-outlined align-bottom ${plan.title === "Free" ? "text-gray-500" : "text-secondary"} me-4`}
                        >
                          check
                        </span>
                        <span className="text-gray-1000">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* CTA 按鈕 */}
                <Link
                  to="/sign-up"
                  className={`btn ${plan.id === recommendedPlan ? "btn-secondary" : "btn-outline-gray-400"} py-md-4 mt-auto w-100`}
                >
                  {plan.title === "Free" ? "立即註冊" : "升級方案"}
                </Link>
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide className="swiper-slide h-auto">
            <div className="bg-gray-0 p-6 border border-gray-100 rounded-4 d-flex flex-column h-100">
              <div>
                {/* 方案名稱 */}
                <div className="pb-6 border-bottom border-gray-400 mb-8">
                  <div className="d-flex justify-content-between mb-6">
                    <span className="badge bg-secondary text-gray-0 border border-gray-500 px-md-4 fs-s fs-md-l">
                      Free
                    </span>
                    <span className="fs-s fs-md-l fw-bold text-gray-500">
                      免費方案
                    </span>
                  </div>
                  <h3>
                    <span className="text-gray-1000 fs-4xl fs-md-5xl">
                      NT$ 0
                    </span>
                    <span className="text-gray-500 lh-base fw-normal fs-m fs-md-xl">
                      / 月
                    </span>
                  </h3>
                </div>
                {/* 方案內容 */}
                <ul className="list-unstyled mb-8">
                  <li className="mb-3">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-4">
                      check
                    </span>
                    <span className="text-gray-1000">建立筆記卡片</span>
                  </li>
                  <li className="mb-3">
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-4">
                      check
                    </span>
                    <span className="text-gray-1000">建立書單</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined align-bottom text-gray-500 me-4">
                      check
                    </span>
                    <span className="text-gray-1000">標籤分類</span>
                  </li>
                </ul>
              </div>
              {/* CTA 按鈕 */}
              <Link
                to="/sign-up"
                className="btn btn-outline-gray-400 py-md-4 mt-auto w-100"
              >
                立即註冊
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide h-auto">
            <div className="bg-gray-0 p-6 border border-2 border-secondary rounded-4 shadow d-flex flex-column h-100">
              <div>
                {/* 方案名稱 */}
                <div className="pb-6 border-bottom border-gray-400 mb-8">
                  <div className="d-flex justify-content-between mb-6">
                    <span className="badge bg-secondary text-gray-0 border border-gray-500 px-md-4 fs-s fs-md-l">
                      Pro
                    </span>
                    <span className="fs-s fs-md-l fw-bold text-gray-500">
                      月繳方案
                    </span>
                  </div>
                  <h3>
                    <span className="text-gray-1000 fs-4xl fs-md-5xl">
                      NT$ 120
                    </span>
                    <span className="text-gray-500 lh-base fw-normal fs-m fs-md-xl">
                      / 月
                    </span>
                  </h3>
                </div>
                {/* 方案內容 */}
                <ul className="list-unstyled mb-8">
                  <li className="mb-3">
                    <span className="material-symbols-outlined align-bottom text-secondary me-4">
                      check
                    </span>
                    <span className="text-gray-1000">無限制建立筆記卡片</span>
                  </li>
                  <li className="mb-3">
                    <span className="material-symbols-outlined align-bottom text-secondary me-4">
                      check
                    </span>
                    <span className="text-gray-1000">無限制建立書單</span>
                  </li>
                  <li className="mb-3">
                    <span className="material-symbols-outlined align-bottom text-secondary me-4">
                      check
                    </span>
                    <span className="text-gray-1000">標籤分類</span>
                  </li>
                  <li className="mb-3">
                    <span className="material-symbols-outlined align-bottom text-secondary me-4">
                      check
                    </span>
                    <span className="text-gray-1000">視覺化關聯地圖</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined align-bottom text-secondary me-4">
                      check
                    </span>
                    <span className="text-gray-1000">進度追蹤與提醒</span>
                  </li>
                </ul>
              </div>
              {/* CTA 按鈕 */}
              <a href="#" className="btn btn-secondary py-md-4 mt-auto w-100">
                升級方案（推薦）
              </a>
            </div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide h-auto">
            <div className="bg-gray-0 p-6 border border-gray-100 rounded-4 d-flex flex-column h-100">
              <div>
                {/* 方案名稱 */}
                <div className="pb-6 border-bottom border-gray-400 mb-8">
                  <div className="d-flex justify-content-between mb-6">
                    <span className="badge bg-secondary text-gray-0 border border-gray-500 px-md-4 fs-s fs-md-l">
                      Pro
                    </span>
                    <span className="fs-s fs-md-l fw-bold text-gray-500">
                      年繳方案
                    </span>
                  </div>
                  <h3>
                    <span className="text-gray-1000 fs-4xl fs-md-5xl">
                      NT$ 1200
                    </span>
                    <span className="text-gray-500 lh-base fw-normal fs-m fs-md-xl">
                      / 年
                    </span>
                  </h3>
                </div>
                {/* <方案內容 */}
                <ul className="list-unstyled mb-8">
                  <li className="mb-3">
                    <span className="material-symbols-outlined align-bottom text-secondary me-4">
                      check
                    </span>
                    <span className="text-gray-1000">無限制建立筆記卡片</span>
                  </li>
                  <li className="mb-3">
                    <span className="material-symbols-outlined align-bottom text-secondary me-4">
                      check
                    </span>
                    <span className="text-gray-1000">無限制建立書單</span>
                  </li>
                  <li className="mb-3">
                    <span className="material-symbols-outlined align-bottom text-secondary me-4">
                      check
                    </span>
                    <span className="text-gray-1000">標籤分類</span>
                  </li>
                  <li className="mb-3">
                    <span className="material-symbols-outlined align-bottom text-secondary me-4">
                      check
                    </span>
                    <span className="text-gray-1000">視覺化關聯地圖</span>
                  </li>
                  <li>
                    <span className="material-symbols-outlined align-bottom text-secondary me-4">
                      check
                    </span>
                    <span className="text-gray-1000">進度追蹤與提醒</span>
                  </li>
                </ul>
              </div>
              {/* CTA 按鈕 */}
              <a
                href="#"
                className="btn btn-outline-gray-400 py-md-4 mt-auto w-100"
              >
                升級方案
              </a>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
