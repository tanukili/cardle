import { useState, useRef, useEffect, children } from 'react';
import FAQItem from './FAQItem';
export default function Detail() {
  // 記錄當前展開項目的 ID，null 表示全部收合
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key) => {
    // 如果點擊的是已展開的那項，就收合(設為 null)；否則切換到該 key
    setActiveKey(activeKey === key ? null : key);
  };
  return(
    <section className="faq py-md-25 py-20">
      <div className="faq-area">
        <div className="container">
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
    </section>)
}
