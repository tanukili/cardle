import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function PlanSwiper() {
  const [plans, setPlans] = useState([]);
  const [recommendedPlan, setRecommendedPlan] = useState("plan_pro_month");

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
        </Swiper>
      </div>
    </>
  );
}
