import { useState, useRef, useEffect, children } from 'react';
import { Swiper, SwiperSlide  } from 'swiper/react';
import 'swiper/css';  
import FAQItem from './FAQItem';
export default function Detail() {
  // 記錄當前展開項目的 ID，null 表示全部收合
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key) => {
    // 如果點擊的是已展開的那項，就收合(設為 null)；否則切換到該 key
    setActiveKey(activeKey === key ? null : key);
  };
  return(
    <div>
      <section className="bg-gray-98 py-md-25 py-20">
        <div className="container text-center"> 
          <h1 className="fs-md-5xl fs-4 pb-6 border-bottom mb-6">選擇適合你的使用方案</h1>
          <div className="mb-6">
            <span className="fs-md-2xl fs-s badge text-tag-secondary bg-tag-secondary-bg py-md-2 px-md-4 py-1 px-2 me-6 rounded-1"># 簡單起步</span>
            <span className="fs-md-2xl fs-s badge text-tag-orange bg-tag-orange-bg py-md-2 px-md-4 py-1 px-2 me-6 rounded-1"># 彈性升級</span>
            <span className="fs-md-2xl fs-s badge text-tag-success bg-tag-success-bg py-md-2 px-md-4 py-1 px-2 rounded-1"># 讓筆記陪你成長</span>
          </div>
          <p className="fs-md-2xl fs-l fw-bold mb-md-20 mb-10 d-flex flex-column flex-md-row justify-content-center align-items-center text-center" >無論你是學生還是專業人士，<br className="d-md-none"/>我們都有適合你的方案。</p>     
        </div> 
        <div style={{ width: '100%', overflow: 'hidden' }}>
        <Swiper style={{ overflow: 'visible' }} className="plan-swiper" initialSlide={2} centeredSlides={true} slidesPerView={"auto"} spaceBetween={40} centerInsufficientSlides={true} centeredSlidesBounds={true} resistanceRatio={0} watchOverflow={true} breakpoints={{320: {
              spaceBetween: 24,
            },
            992: {
              spaceBetween: 40
            }}}>

              {/* Slide 1 */}
            <SwiperSlide className="col-md-4 col-12 h-auto">
              <div className="bg-gray-0 p-6 border border-gray-100 rounded-4 d-flex flex-column h-100">
                <div>
                  <div className="pb-6 border-bottom border-gray-400 mb-8">
                    <div className="d-flex justify-content-between mb-6">
                      <span className="badge bg-secondary text-gray-0 border border-gray-500 px-md-4 fs-s fs-md-l">Free</span>
                      <span className="fs-s fs-md-l fw-bold text-gray-500">免費方案</span>
                    </div>
                    <h3 className="text-start">
                      <span className="text-gray-1000 fs-4xl fs-md-5xl">NT$ 0</span>
                      <span className="text-gray-500 lh-base fw-normal fs-m fs-md-xl">/ 月</span>
                    </h3>
                  </div>
                  <ul className="list-unstyled mb-8 text-start">
                    <li className="mb-3">
                      <span className="material-symbols-outlined align-bottom text-secondary me-4"> check </span>
                      <span className="text-gray-1000">建立筆記卡片</span>
                    </li>
                    <li className="mb-3">
                      <span className="material-symbols-outlined align-bottom text-secondary me-4"> check </span>
                      <span className="text-gray-1000">建立書單</span>
                    </li>
                    <li className="mb-3">
                      <span className="material-symbols-outlined align-bottom text-secondary me-4"> check </span>
                      <span className="text-gray-1000">標籤分類</span>
                    </li>
                  </ul>
                </div>
                <a href="#" className="btn btn-outline-gray-400 py-md-4 mt-auto w-100 fs-md-5 fs-6">立即註冊</a>
              </div>
            </SwiperSlide>
            <SwiperSlide className="col-md-4 col-12 h-auto">
              <div className="bg-gray-0 p-6 border border-2 border-secondary rounded-4 shadow d-flex flex-column h-100">
                <div>
                  <div className="pb-6 border-bottom border-gray-400 mb-8">
                    <div className="d-flex justify-content-between mb-6">
                      <span className="badge bg-secondary text-gray-0 border border-gray-500 px-md-4 fs-s fs-md-l">Pro</span>
                      <span className="fs-s fs-md-l fw-bold text-gray-500">月繳方案</span>
                    </div>
                    <h3 className="text-start">
                      <span className="text-gray-1000 fs-4xl fs-md-5xl">NT$ 120</span>
                      <span className="text-gray-500 lh-base fw-normal fs-m fs-md-xl">/ 月</span>
                    </h3>
                  </div>
                  <ul className="list-unstyled mb-8 text-start">
                    <li className="mb-3">
                      <span className="material-symbols-outlined align-bottom text-secondary me-4"> check </span>
                      <span className="text-gray-1000">無限制建立筆記卡片</span>
                    </li>
                    <li className="mb-3">
                      <span className="material-symbols-outlined align-bottom text-secondary me-4"> check </span>
                      <span className="text-gray-1000">無限制建立書單</span>
                    </li>
                    <li className="mb-3">
                      <span className="material-symbols-outlined align-bottom text-secondary me-4"> check </span>
                      <span className="text-gray-1000">標籤分類</span>
                    </li>
                    <li className="mb-3">
                      <span className="material-symbols-outlined align-bottom text-secondary me-4"> check </span>
                      <span className="text-gray-1000">視覺化關聯地圖</span>
                    </li>
                    <li>
                      <span className="material-symbols-outlined align-bottom text-secondary me-4"> check </span>
                      <span className="text-gray-1000">進度追蹤與提醒</span>
                    </li>
                  </ul>
                </div>
                <a href="#" className="btn btn-secondary py-md-4 mt-auto w-100 fs-md-5 fs-6">升級方案（推薦）</a>
              </div>
            </SwiperSlide>
            <SwiperSlide className="col-md-4 col-12 h-auto">
              <div className="bg-gray-0 p-6 border border-gray-100 rounded-4 d-flex flex-column h-100">
                <div>
                  <div className="pb-6 border-bottom border-gray-400 mb-8">
                    <div className="d-flex justify-content-between mb-6">
                      <span className="badge bg-secondary text-gray-0 border border-gray-500 px-md-4 fs-s fs-md-l">Pro</span>
                      <span className="fs-s fs-md-l fw-bold text-gray-500">年繳方案</span>
                    </div>
                    <h3 className="text-start">
                      <span className="text-gray-1000 fs-4xl fs-md-5xl">NT$ 1200</span>
                      <span className="text-gray-500 lh-base fw-normal fs-m fs-md-xl">/ 年</span>
                    </h3>
                  </div>
                  <ul className="list-unstyled mb-8 text-start">
                    <li className="mb-3">
                      <span className="material-symbols-outlined align-bottom text-secondary me-4"> check </span>
                      <span className="text-gray-1000">無限制建立筆記卡片</span>
                    </li>
                    <li className="mb-3">
                      <span className="material-symbols-outlined align-bottom text-secondary me-4"> check </span>
                      <span className="text-gray-1000">無限制建立書單</span>
                    </li>
                    <li className="mb-3">
                      <span className="material-symbols-outlined align-bottom text-secondary me-4"> check </span>
                      <span className="text-gray-1000">標籤分類</span>
                    </li>
                    <li className="mb-3">
                      <span className="material-symbols-outlined align-bottom text-secondary me-4"> check </span>
                      <span className="text-gray-1000">視覺化關聯地圖</span>
                    </li>
                    <li>
                      <span className="material-symbols-outlined align-bottom text-secondary me-4"> check </span>
                      <span className="text-gray-1000">進度追蹤與提醒</span>
                    </li>
                  </ul>
                </div>
                <a href="#" className="btn btn-outline-gray-400 py-md-4 mt-auto w-100 fs-md-5 fs-6">升級方案</a>
              </div>
            </SwiperSlide> 
        </Swiper>
        </div>
     </section>
    <section className="faq py-md-25 py-20">
      <div className="faq-area">
        <div className="container">
          <h2 className="fs-md-5xl fs-4 pb-6 border-bottom text-center">FAQ</h2>
          <div className="background-blocks">
              <img className="colorblocks top-right"  src="./public/detail/deco1.svg" alt="deco1"/>
              <img className="colorblocks bottom-left" src="./public/detail/deco2.svg" alt="deco2"/>
              <div className="row justify-content-center">
                <div className="col-md-8 col-11  py-md-20 py-10">
                  <div className="accordion" id="faqAccordion">
                    <FAQItem question="我想進一步了解方案，可以說明方案的詳細內容嗎？" isOpen={activeKey === 'item1'} onToggle={() => handleToggle('item1')}>
                      <p className="mb-1">月繳方案：可以隨時取消，下個月不再自動續費。</p>
                      <p className="mb-0">年繳方案：購買後會持續提供一年服務，中途不提供退款。</p>
                    </FAQItem>
                    <FAQItem question="我可以隨時變更方案嗎？" isOpen={activeKey === 'item2'} onToggle={() => handleToggle('item2')}>
                      <p className="mb-0">可以。您可以隨時升級或降級方案，新的方案會在下個週期生效。</p>
                    </FAQItem>
                    <FAQItem question="什麼方案適合我？" isOpen={activeKey === 'item3'} onToggle={() => handleToggle('item3')}>
                      <p className="mb-0">目前支援信用卡付款（Visa、Mastercard、JCB），以及部分電子支付。</p>
                    </FAQItem>
                    <FAQItem question="卡片數量與書單數量的上限分別是多少？" isOpen={activeKey === 'item4'} onToggle={() => handleToggle('item4')}>
                      {/* <p className="mb-0"> */}
                        免費方案:
                        <ul>
                          <li>建立筆記卡片</li>
                          <li>建立書單</li>
                          <li>標籤分類</li>
                        </ul>

                        付費方案(月繳、年繳):
                        <ul>
                          <li>無限制建立筆記卡片</li>
                          <li>無限制建立書單</li>
                          <li>標籤分類</li>
                          <li>視覺化關聯地圖</li>
                          <li>進度追蹤與提醒</li>
                        </ul>
                      {/* </p> */}
                    </FAQItem>
                  </div>
                </div>
              </div>     
          </div>
        </div> 
      </div>            
    </section>
    <section className="calltoactionarea">
    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center text-center p-2">
      <h3 className="fw-bold fs-md-4xl fs-5 me-md-10 me-0 mb-md-0 mb-10">
        現在就開始你的學習旅程，<br className="d-lg-none"/>打造你的知識網絡！
      </h3>
          <a href="#" className="btn btn-primary ms-md-3 fs-md-5 fs-6">
            立即開始
          </a>
        </div>
    </section>
    </div>
  )

}