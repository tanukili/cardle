import { Outlet, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import PlanSwiper from "../components/PlanSwiper";
import { version } from "react";

export default function Home() {
  return (
    <>
      <h1>1. 首頁</h1>

      {/* hero 區塊 */}
      <section className="hero vh-100">
        <div className="container h-100">
          <div className="d-flex flex-column justify-content-center px-7_5 px-md-0 h-100">
            <h1 className="fs-3xl fs-md-6xl mb-4 mb-md-8" data-aos="fade-up">
              卡片紀錄想法，讓知識自在成長
            </h1>
            <p
              className="fw-bold fs-l fs-md-3xl mb-8"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              把靈感拆解、連結、重組，打造專屬你的知識地圖。
            </p>
            <a
              href="<%= HERF_BASE %>sing-up.html"
              className="btn btn-primary align-self-md-start fs-md-xl py-md-4 px-md-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              立即開始
            </a>
          </div>
        </div>
      </section>

      <main className="position-relative overflow-x-hidden">
        {/* 什麼是「 卡片筆記 」？ */}
        <section className="zettelkasten bg-light py-20 py-md-25">
          <div className="container">
            <div
              className="bg-gray-0 p-6 p-md-15 border border-gray-400 rounded-5 shadow"
              data-aos="fade-up"
            >
              {/* 什麼是「 卡片筆記 」- 文字 */}
              <h2 className="fs-2xl fs-md-5xl pb-6 border-bottom border-gray-400 mb-6">
                什麼是「卡片筆記」？
              </h2>
              <p className="fw-bold fw-md-medium fs-md-2xl text-gray-600 mb-6 mb-md-10">
                卡片筆記是一種將知識分解、重組、連結的筆記方式，啟發自
                Zettelkasten ( 德語：卡片盒筆記法 )
                與傳統段落式筆記不同，卡片筆記更接近人腦思考方式。
              </p>
              {/* 什麼是「 卡片筆記 」- 卡片列表 */}
              <ol className="d-flex flex-column flex-lg-row gap-6 list-unstyled mb-0">
                <li
                  className="card border-gray-200 rounded-4 overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <img
                    src="index/zettelkasten_01.png"
                    className="card-img-top"
                    alt="zettelkasten_01"
                  />
                  <div className="card-body fs-md-xl p-md-6">
                    <p className="fw-bold text-gray-700 d-flex">
                      <span className="material-symbols-outlined align-bottom me-4 me-xl-6">
                        check
                      </span>
                      每張卡片紀錄一個單一概念
                    </p>
                  </div>
                </li>
                <li
                  className="card border-gray-200 rounded-4 overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <img
                    src="index/zettelkasten_02.png"
                    className="card-img-top"
                    alt="zettelkasten_02"
                  />
                  <div className="card-body fs-md-xl p-md-6">
                    <p className="fw-bold text-gray-700 d-flex">
                      <span className="material-symbols-outlined align-bottom me-4 me-xl-6">
                        check
                      </span>
                      透過標籤、分類與連結
                    </p>
                  </div>
                </li>
                <li
                  className="card border-gray-200 rounded-4 overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <img
                    src="index/zettelkasten_03.png"
                    className="card-img-top"
                    alt="zettelkasten_03"
                  />
                  <div className="card-body fs-md-xl p-md-6">
                    <p className="fw-bold text-gray-700 d-flex">
                      <span className="material-symbols-outlined align-bottom me-4 me-xl-6">
                        check
                      </span>
                      逐步建立出屬於你的知識地圖
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        {/* Cardle 能為你做到什麼？ */}
        <section className="function bg-light py-20 py-md-25">
          <div className="function-content">
            <div className="container">
              {/* Cardle 能為你做到什麼 - 標題 */}
              <div className="text-center mb-10 mb-md-16">
                <h2 className="fs-2xl fs-md-5xl mb-4 mb-md-6">
                  Cardle 能為你做到什麼？
                </h2>
                <span className="badge badge-secondary fs-md-2xl lh-base lh-md-sm py-md-2 px-md-4">
                  # 從閱讀到整理，陪你建立自己的知識系統
                </span>
              </div>
              {/* Cardle 能為你做到什麼 - 輪播列表 */}
              {/* Swiper 主容器 */}
              <Swiper
                className="function-swiper"
                slidesPerView={"auto"}
                spaceBetween={24}
                breakpoints={{ 768: { direction: "vertical" } }}
              >
                {/* 多個 Slides */}
                <SwiperSlide className="swiper-slide">
                  <div className="d-md-flex justify-content-between gap-10 px-lg-10">
                    <div
                      className="border border-gray-400 rounded-4 shadow overflow-hidden mb-10 mb-md-0 w-md-580 function-img"
                      data-aos="flip-right"
                      data-aos-delay="100"
                    >
                      <img src="index/function_01.png" alt="function_01" />
                    </div>
                    <div className="d-flex flex-column justify-content-center max-w-516">
                      <h3 className="lh-base lh-md-sm text-primary-900 fs-xl fs-lg-3xl mb-4 mb-md-8">
                        閱讀追蹤
                      </h3>
                      <p className="text-primary-900 fs-lg-l">
                        集中整理你正在閱讀的文章、書籍、課程或影片，針對每項資源標記章節、頁碼或時間軸進度。系統會自動提醒尚未完成的項目，讓學習進度一目了然、不再遺忘。
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="d-md-flex justify-content-between gap-10 px-lg-10">
                    <div
                      className="border border-gray-400 rounded-4 shadow overflow-hidden mb-10 mb-md-0 w-md-580 function-img order-1"
                      data-aos="flip-right"
                      data-aos-delay="200"
                    >
                      <img src="index/function_02.png" alt="function_02" />
                    </div>
                    <div className="d-flex flex-column justify-content-center max-w-516 order-0">
                      <h3 className="lh-base lh-md-sm text-primary-900 fs-xl fs-lg-3xl mb-4 mb-md-8">
                        卡片筆記
                      </h3>
                      <p className="text-primary-900 fs-lg-l">
                        每張卡片承載一個清晰概念，讓你以更貼近人腦的方式紀錄與組織知識。支援多標籤分類、補充筆記、進度狀態標示，打造屬於你的智慧筆記系統。
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="d-md-flex justify-content-between gap-10 px-lg-10">
                    <div
                      className="border border-gray-400 rounded-4 shadow overflow-hidden mb-10 mb-md-0 w-md-580 function-img"
                      data-aos="flip-right"
                      data-aos-delay="300"
                    >
                      <img src="index/function_03.png" alt="function_03" />
                    </div>
                    <div className="d-flex flex-column justify-content-center max-w-516">
                      <h3 className="lh-base lh-md-sm text-primary-900 fs-xl fs-lg-3xl mb-4 mb-md-8">
                        卡片盒管理
                      </h3>
                      <p className="text-primary-900 fs-lg-l">
                        將筆記卡片依主題、用途或專案分門別類，如「設計思維」、「AI筆記」、「商業模型」。就像為你的知識建立資料夾與抽屜，快速取用，輕鬆擴展。
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="d-md-flex justify-content-between gap-10 px-lg-10">
                    <div
                      className="border border-gray-400 rounded-4 shadow overflow-hidden mb-10 mb-md-0 w-md-580 function-img order-1"
                      data-aos="flip-right"
                      data-aos-delay="300"
                    >
                      <img src="index/function_04.png" alt="function_04" />
                    </div>
                    <div className="d-flex flex-column justify-content-center max-w-516 order-0">
                      <h3 className="lh-base lh-md-sm text-primary-900 fs-xl fs-lg-3xl mb-4 mb-md-8">
                        白板地圖
                      </h3>
                      <p className="text-primary-900 fs-lg-l">
                        在自由畫布中拖曳卡片、建立連結，視覺化展開你的思考網絡。從主題出發，串聯子概念與靈感，打造有層次、有脈絡的知識地圖。
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>

        {/* 為什麼選擇 Cardle？ */}
        <section className="reason bg-light py-20 py-md-25">
          <div className="container">
            {/* 為什麼選擇 Cardle - 標題 */}
            <div className="reason-content text-center mb-10 mb-md-20">
              <h2 className="fs-2xl fs-md-5xl mb-4 mb-md-6">
                為什麼選擇 Cardle？
              </h2>
              <span className="badge badge-orange fs-md-2xl lh-base lh-md-sm py-md-2 px-md-4">
                # 從線性紀錄到網狀思考的轉變
              </span>
            </div>
            {/* 為什麼選擇 Cardle - 卡片 */}
            <div className="d-flex flex-column flex-md-row gap-10 gap-lg-20">
              {/* 傳統筆記工具 */}
              <div data-aos="fade-left">
                <div className="mb-4 mb-md-8">
                  <img src="index/why_01.png" alt="why_01" />
                </div>
                <div>
                  <h3 className="text-center text-primary-900 fs-xl fs-md-3xl mb-4">
                    傳統筆記工具
                  </h3>
                  <p className="text-center text-primary-800 fs-md-xl">
                    難整理、難連結
                  </p>
                </div>
              </div>
              {/* Cardle */}
              <div data-aos="fade-left" data-aos-delay="100">
                <div className="mb-4 mb-md-8">
                  <img src="index/why_02.png" alt="why_02" />
                </div>
                <div>
                  <h3 className="text-center text-primary-900 fs-xl fs-md-3xl mb-4">
                    Cardle
                  </h3>
                  <p className="text-center text-primary-800 fs-md-xl">
                    自由連結與視覺化的知識地圖
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 用戶怎麼說 */}
        <section className="comment">
          <div className="bg-gray-200 py-8 py-md-25">
            <div className="container">
              {/* 用戶怎麼說 - 標題 */}
              <div className="text-center mb-10 mb-md-20">
                <h2 className="fs-2xl fs-md-5xl mb-4 mb-md-6">用戶怎麼說</h2>
                <span className="badge badge-success fs-md-2xl lh-base lh-md-sm py-md-2 px-md-4">
                  # 來自用戶的真實回饋
                </span>
              </div>
              {/* 用戶怎麼說 - 評論卡片輪播 */}
              {/* Swiper 主容器 */}
              <Swiper
                className="comment-swiper"
                modules={[Autoplay]}
                loop={true}
                slidesPerView={"auto"}
                spaceBetween={24}
                speed={10000}
                autoplay={{ delay: 0, disableOnInteraction: false }}
                allowTouchMove={false}
                loopAdditionalSlides={2}
              >
                {/* 多個 Slides */}
                <SwiperSlide className="swiper-slide">
                  {/* user_01 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow mb-6">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_01.jpg" alt="user_01" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Yuki</p>
                          <p className="text-gray-500 fs-s">創業者</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        只有 Cardle 最貼近我真正的思考方式
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        從 Notion 到
                        Obsidian，我試過各種筆記工具，但大多仍是「頁面內的線性紀錄」。Cardle
                        讓我把想法像卡片一樣自由擺放、拖曳、串連，腦中的路徑就能在畫面上被看見。當我需要專注時，它是乾淨的白板；當我需要連結時，它是可以任意拉線的地圖。這不只是記錄，而是我每天工作流程的延伸，回顧時只要一眼就能找到關鍵。
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                  {/* user_02 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_02.png" alt="user_02" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Nanda</p>
                          <p className="text-gray-500 fs-s">學術研究者</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        我終於不再迷失在上百頁的PDF和雜亂筆記裡。
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        以前我的筆記都放在Notion或Word裡，寫是寫了，但每次找資料都像在考古。自從用了Cardle，我把每個論點和資料整理成卡片，再用白板把它們連起來，不但清楚看到哪些觀點互相關聯，還意外發現新的研究方向。
                        <br />
                        我特別喜歡卡片盒功能，能按照主題整理不同段落的想法，像是幫我建立一套「知識資料庫」。現在整理論文進度變得超直覺，寫作效率也提升了很多！
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  {/* user_03 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow mb-6">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_04.png" alt="user_04" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Ken</p>
                          <p className="text-gray-500 fs-s">設計師</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        我從來沒想過，整理知識可以這麼直覺！
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        用Cardle建立卡片、拖曳與連結，就像把腦中的線索攤開成一張思緒地圖。以前總覺得做筆記是一件沉重的事，現在卻變得像在玩拼圖，那些零碎的靈感也在不知不覺中被串聯起來。
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                  {/* user_04 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_03.png" alt="user_03" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Makzan</p>
                          <p className="text-gray-500 fs-s">專案工作者</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        從會議紀錄到企劃草稿，一切變得更有邏輯。
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        Cardle完美取代了我過去雜亂的文件夾和筆記工具。每次會議後，我用卡片記下重點，接著把相關卡片拖進同一個卡片盒（像是『市場研究』、『用戶需求』），更進一步，我會在白板上連接卡片，規劃專案流程。這種自由但有結構的筆記方式，讓我能更快速統整資訊，也讓跨部門溝通變得更有效率。對我來說，Cardle
                        不只是筆記工具，它是我的第二個大腦。
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  {/* user_05 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow mb-6">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_07.png" alt="user_07" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Alan</p>
                          <p className="text-gray-500 fs-s">講師</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        卡片盒設計太棒了！
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        我把不同主題的筆記像資料夾一樣分門別類，找資料再也不手忙腳亂。每次整理完卡片盒，都有種井然有序的成就感。
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                  {/* user_06 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow mb-6">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_05.png" alt="user_05" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Mei</p>
                          <p className="text-gray-500 fs-s">產品經理</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        Cardle 讓我第一次『看見』思考的脈絡
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        傳統筆記常常寫了就忘，翻閱時只能一頁頁翻。Cardle不一樣，它讓我在畫面上看到想法之間的連結，我可以明確感受到自己是怎麼從
                        A 想到 B，再推進到 C。
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                  {/* user_07 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_06.png" alt="user_06" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Diane</p>
                          <p className="text-gray-500 fs-s">自由寫作者</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        『 閱讀追蹤 』功能超實用
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        過去常常學到一半就忘了進度，現在只要打開 Cardle
                        就知道上次停在哪。它會提醒我下一步該繼續哪章，學習效率整個提升！
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  {/* user_08 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow mb-6">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_08.png" alt="user_08" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Max</p>
                          <p className="text-gray-500 fs-s">創作者</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        創作靈感不再散落，卡片幫我捕捉每一道想法。
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        寫作靈感來來去去，過去我常打開一堆備忘錄、Google
                        Docs，最後反而找不到當初的那個點子。現在我把每個靈感都寫成卡片，分類到不同的主題卡片盒（像是「小說角色」、「情節靈感」、「文章開頭」），然後在白板上做結構規劃。
                        <br />
                        寫文章就像拼拼圖一樣，卡片之間可以移動、重組，這真的非常符合我腦中思考的方式。Cardle讓我更安心地把創作留在一個地方，也更容易「看到」我正在構築什麼。
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                  {/* user_09 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_09.png" alt="user_09" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Lili</p>
                          <p className="text-gray-500 fs-s">研究所學生</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        卡片筆記讓資訊變得更輕盈
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        一段段長篇文字太難瀏覽，Cardle的卡片設計解放了我。每個重點都能獨立存在，又能被標籤分類、自由組合。整理起來更有效率，思緒也更清楚！
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                </SwiperSlide>
                {/* 重複 */}
                <SwiperSlide className="swiper-slide">
                  {/* user_01 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow mb-6">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_01.jpg" alt="user_01" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Yuki</p>
                          <p className="text-gray-500 fs-s">創業者</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        只有 Cardle 最貼近我真正的思考方式
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        從 Notion 到
                        Obsidian，我試過各種筆記工具，但大多仍是「頁面內的線性紀錄」。Cardle
                        讓我把想法像卡片一樣自由擺放、拖曳、串連，腦中的路徑就能在畫面上被看見。當我需要專注時，它是乾淨的白板；當我需要連結時，它是可以任意拉線的地圖。這不只是記錄，而是我每天工作流程的延伸，回顧時只要一眼就能找到關鍵。
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                  {/* user_02 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_02.png" alt="user_02" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Nanda</p>
                          <p className="text-gray-500 fs-s">學術研究者</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        我終於不再迷失在上百頁的PDF和雜亂筆記裡。
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        以前我的筆記都放在Notion或Word裡，寫是寫了，但每次找資料都像在考古。自從用了Cardle，我把每個論點和資料整理成卡片，再用白板把它們連起來，不但清楚看到哪些觀點互相關聯，還意外發現新的研究方向。
                        <br />
                        我特別喜歡卡片盒功能，能按照主題整理不同段落的想法，像是幫我建立一套「知識資料庫」。現在整理論文進度變得超直覺，寫作效率也提升了很多！
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  {/* user_03 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow mb-6">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_04.png" alt="user_04" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Ken</p>
                          <p className="text-gray-500 fs-s">設計師</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        我從來沒想過，整理知識可以這麼直覺！
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        用Cardle建立卡片、拖曳與連結，就像把腦中的線索攤開成一張思緒地圖。以前總覺得做筆記是一件沉重的事，現在卻變得像在玩拼圖，那些零碎的靈感也在不知不覺中被串聯起來。
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                  {/* user_04 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_03.png" alt="user_03" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Makzan</p>
                          <p className="text-gray-500 fs-s">專案工作者</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        從會議紀錄到企劃草稿，一切變得更有邏輯。
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        Cardle完美取代了我過去雜亂的文件夾和筆記工具。每次會議後，我用卡片記下重點，接著把相關卡片拖進同一個卡片盒（像是『市場研究』、『用戶需求』），更進一步，我會在白板上連接卡片，規劃專案流程。這種自由但有結構的筆記方式，讓我能更快速統整資訊，也讓跨部門溝通變得更有效率。對我來說，Cardle
                        不只是筆記工具，它是我的第二個大腦。
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  {/* user_05 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow mb-6">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_07.png" alt="user_07" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Alan</p>
                          <p className="text-gray-500 fs-s">講師</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        卡片盒設計太棒了！
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        我把不同主題的筆記像資料夾一樣分門別類，找資料再也不手忙腳亂。每次整理完卡片盒，都有種井然有序的成就感。
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                  {/* user_06 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow mb-6">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_05.png" alt="user_05" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Mei</p>
                          <p className="text-gray-500 fs-s">產品經理</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        Cardle 讓我第一次『看見』思考的脈絡
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        傳統筆記常常寫了就忘，翻閱時只能一頁頁翻。Cardle不一樣，它讓我在畫面上看到想法之間的連結，我可以明確感受到自己是怎麼從
                        A 想到 B，再推進到 C。
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                  {/* user_07 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_06.png" alt="user_06" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Diane</p>
                          <p className="text-gray-500 fs-s">自由寫作者</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        『 閱讀追蹤 』功能超實用
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        過去常常學到一半就忘了進度，現在只要打開 Cardle
                        就知道上次停在哪。它會提醒我下一步該繼續哪章，學習效率整個提升！
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  {/* user_08 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow mb-6">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_08.png" alt="user_08" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Max</p>
                          <p className="text-gray-500 fs-s">創作者</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        創作靈感不再散落，卡片幫我捕捉每一道想法。
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        寫作靈感來來去去，過去我常打開一堆備忘錄、Google
                        Docs，最後反而找不到當初的那個點子。現在我把每個靈感都寫成卡片，分類到不同的主題卡片盒（像是「小說角色」、「情節靈感」、「文章開頭」），然後在白板上做結構規劃。
                        <br />
                        寫文章就像拼拼圖一樣，卡片之間可以移動、重組，這真的非常符合我腦中思考的方式。Cardle讓我更安心地把創作留在一個地方，也更容易「看到」我正在構築什麼。
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                  {/* user_09 */}
                  <div className="bg-gray-0 p-4 border border-primary-100 rounded-4 shadow">
                    {/* 頭像, user 及星星 */}
                    <div className="d-flex justify-content-between mb-4">
                      <div className="d-flex gap-4">
                        <div className="avatar-48">
                          <img src="index/user_09.png" alt="user_09" />
                        </div>
                        <div>
                          <p className="fw-bold mb-1">Lili</p>
                          <p className="text-gray-500 fs-s">研究所學生</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                        <span className="material-symbols-outlined fill text-star">
                          star
                        </span>
                      </div>
                    </div>
                    {/* 評論內容 */}
                    <div className="mb-4">
                      <h3 className="text-gray-700 lh-base fs-m fs-md-l mb-2">
                        卡片筆記讓資訊變得更輕盈
                      </h3>
                      <p className="text-gray-600 fs-s fs-md-m">
                        一段段長篇文字太難瀏覽，Cardle的卡片設計解放了我。每個重點都能獨立存在，又能被標籤分類、自由組合。整理起來更有效率，思緒也更清楚！
                      </p>
                    </div>
                    {/* 評論時間 */}
                    <time
                      datetime="2021-11-23"
                      className="font-Manrope text-gray-500 fs-xs lh-1"
                    >
                      23 Nov 2021
                    </time>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>

        {/* 選擇適合你的使用方案 */}
        <section className="plan">
          <div className="bg-gray-600 py-20 py-md-25">
            <div className="container">
              {/* 選擇適合你的使用方案 - 標題與標籤 */}
              <div className="mb-10 mb-md-20">
                <h2 className="text-center text-gray-0 fs-2xl fs-md-5xl pb-6 border-bottom border-gray-0 mb-6">
                  選擇適合你的使用方案
                </h2>
                <div className="d-flex justify-content-center gap-2 gap-md-6">
                  <span className="badge badge-gray-light fs-md-2xl lh-base lh-md-sm py-md-2 px-md-4">
                    # 簡單起步
                  </span>
                  <span className="badge badge-gray-light fs-md-2xl lh-base lh-md-sm py-md-2 px-md-4">
                    # 彈性升級
                  </span>
                  <span className="badge badge-gray-light fs-md-2xl lh-base lh-md-sm py-md-2 px-md-4">
                    # 讓筆記陪你成長
                  </span>
                </div>
              </div>
              {/* 選擇適合你的使用方案 - 方案卡片輪播 */}
              <PlanSwiper />
            </div>
          </div>
        </section>
      </main>

      {/* 頁尾 */}
      <footer className="bg-gray-0 py-16">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center mb-8">
            {/* 標題 */}
            <div className="text-center text-md-start mb-8 mb-md-0">
              <a href="<%= HERF_BASE %>index.html" className="mb-4 mb-md-2">
                <img src="icons/logo-with-text.svg" alt="logo" />
              </a>
              <p className="text-primary fw-bold fs-s">
                把靈感放進卡片盒，慢慢長成知識的森林。
              </p>
            </div>
            {/* 導覽連結 */}
            <ul className="nav nav-pills flex-column flex-md-row align-items-center gap-3">
              <li className="nav-item">
                <a className="nav-link" href="<%= HERF_BASE %>index.html">
                  首頁
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="<%= HERF_BASE %>features.html">
                  產品介紹
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="<%= HERF_BASE %>subscription/detail.html"
                >
                  訂閱方案
                </a>
              </li>
            </ul>
          </div>
          {/* 社群連結, copyright */}
          <div className="d-flex flex-column flex-md-row justify-content-md-between align-items-center gap-6">
            <ul className="community-list list-unstyled d-flex gap-8 mb-0">
              <li>
                <a href="#" className="community-link">
                  <img src="icons/facebook.svg" alt="facebook" />
                </a>
              </li>
              <li>
                <a href="#" className="community-link">
                  <img src="icons/Instagram.svg" alt="Instagram" />
                </a>
              </li>
              <li>
                <a href="#" className="community-link">
                  <img src="icons/twitter.svg" alt="twitter" />
                </a>
              </li>
              <li>
                <a href="#" className="community-link">
                  <img src="icons/email.svg" alt="email" />
                </a>
              </li>
            </ul>
            <p class="text-gray-500">©2025 Cardle All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
