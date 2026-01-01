import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function PlanSwiper() {
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
              <a
                href="<%= HERF_BASE %>sing-up.html"
                className="btn btn-outline-gray-400 py-md-4 mt-auto w-100"
              >
                立即註冊
              </a>
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
