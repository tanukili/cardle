import { useSelector, useDispatch } from "react-redux";
import ProgressList from "@/components/bookshelf/ProgressList";
import BaseCard from "@/components/card/BaseCard";
import CardBox from "@/components/card/CardBox";

export default function Dashboard() {
  const userInfo = useSelector((state) => state.user.userInfo);

  const learningResources = [
    {
      type: "book",
      title: "看完這本就會懂！無痛攻克 JavaScript 面試必考觀念與技巧",
      link: "",
      totalUnit: 100,
      completedUnit: 75,
      id: "1",
    },
    {
      type: "book",
      title: "金魚都能懂的CSS 必學屬性：網頁設計必備寶典",
      link: "",
      totalUnit: 100,
      completedUnit: 50,
      id: "2",
    },
    {
      type: "video",
      title: "TypeScript 中文基礎課程",
      link: "",
      totalUnit: 100,
      completedUnit: 25,
      id: "3",
    },
    {
      type: "podcast",
      title:
        "EP629 專案經理只是開會追進度的角色？宰相蕭何教你如何看懂局，成為老闆最倚重的軍師",
      link: "https://podcasts.apple.com/tw/podcast/ep629-%E5%B0%88%E6%A1%88%E7%B6%93%E7%90%86%E5%8F%AA%E6%98%AF%E9%96%8B%E6%9C%83%E8%BF%BD%E9%80%B2%E5%BA%A6%E7%9A%84%E8%A7%92%E8%89%B2-%E5%AE%B0%E7%9B%B8%E8%95%AD%E4%BD%95%E6%95%99%E4%BD%A0%E5%A6%82%E4%BD%95%E7%9C%8B%E6%87%82%E5%B1%80-%E6%88%90%E7%82%BA%E8%80%81%E9%97%86%E6%9C%80%E5%80%9A%E9%87%8D%E7%9A%84%E8%BB%8D%E5%B8%AB/id1452688611?i=1000741740202",
      totalUnit: 100,
      completedUnit: 100,
      id: "4",
    },
    {
      type: "book",
      title: "是挑剔還是找碴？從產品開發面探討QA堅守的底線",
      link: "https://progressbar.tw/posts/239?srsltid=AfmBOooyQpD9_megsssTCc-Tobx6izYkVOKGPcUjJWC9p7yScJmnIZJR",
      totalUnit: 100,
      completedUnit: 0,
      id: "5",
    },
  ];

  const lastestCards = [
    {
      badgeId: "1",
      id: "1",
      title: "**常見單位（px, %, rem）**",
      content: `px：固定像素  
%：相對於父元素  
rem：相對於 root font size`,
    },
    {
      badgeId: "1",
      id: "2",
      title: "**實用建議**",
      content: `* 響應式設計：建議優先使用 rem + % + vw/vh 的組合  
* 元件內縮放：用 em 可以讓文字隨父層等比縮放  
* 精準控制：設計系統中仍可用 px 做細節調整`,
    },
    {
      badgeId: "2",
      id: "3",
      title: "**和風醬汁：醬油 × 味醂 × 高湯**",
      content: `常見比例為：  
1（醬油）：1（味醂）：2（高湯）  

---  

可用於燉煮、壽喜燒、烏龍麵湯底，味醂帶甜味並增加照面光澤。`,
    },
    {
      badgeId: "2",
      id: "4",
      title: "**黃金比例：醬油 × 糖 × 米酒**",
      content: `適用於台式紅燒料理，常見比例為：  
1（醬油）：1（糖）：1（米酒）  

---  

醬油提鹹香、糖增加焦化風味、米酒去腥提味。  
👉 也可加入少許水稀釋，適用於紅燒肉、紅燒豆腐等。`,
    },
    {
      title: "**麻婆豆腐食譜（2-3人份）**",
      content: `---  
食材準備：  
* 嫩豆腐：1盒（約300g，建議用棉豆腐或北豆腐）
* 牛／豬絞肉：100g
* 蒜末：2瓣
* 薑末：1小匙
* 蔥花：適量（分開蔥白與蔥綠）
* 豆瓣醬：1.5 大
* 醬油：1 大匙
* 料酒：1 大匙
* 水：200ml
* 太白粉水：1大匙粉＋1大匙水混合
* 花椒粉／油：1/2 小匙
* 辣椒粉或辣椒油：依個人口味
* 香油：少許`,
      badgeId: "2",
      id: "5",
    },
    {
      title: "**props vs state**",
      content: `props 是由父元件傳入的資料。  
    state 是元件內部的狀態，可被修改。`,
      badgeId: "3",
      id: "6",
    },
    {
      title: "**Flexbox（彈性盒子）**",
      content: `\`display: flex;\`  
    是現代網頁常用的排版方式之一，能夠快速讓元素水平或垂直對齊`,
      badgeId: "1",
      id: "7",
    },
    {
      title: "**Box Model（盒模型）**",
      content: `CSS 的每個元素都像一個盒子，由以下幾個部分構成（由內而外）：  
\`[margin] [border] [padding] [content]\`  

---

* \`content\`元素實際內容，如文字、圖片等
* \`padding\`內容與邊框之間的間距
* \`border\`元素的邊框
* \`margin\`元素與外部其他元素之間的距離`,
      badgeId: "1",
      id: "8",
    },
    {
      title: "**useState — 狀態管理入門**",
      content: `用來宣告與更新元件內的狀態  
\`\`\`javascript
const [count, setCount] = useState(0);
setCount(count + 1);
\`\`\`  
每次 \`setCount\` 呼叫後元件會重新渲染。`,
      badgeId: "3",
      id: "9",
    },
    {
      title: "**《我得了不想上班的病》- 倦怠 3 種類型：**",
      content: `1. 過勞
2. 社交疲憊
3. 無聊萎靡
`,
      badgeId: "4",
      id: "10",
    },
    {
      title: "**過勞型倦怠**",
      content: `一直處與工作狀態、全職育兒的人的身上。過度努力、有責任感。

---
常見跡象： 
1. 主客觀來看都很忙
2. 時間總是不夠
3. 跟不上的焦慮或內疚
4. 這陣子忙完就好
`,
      badgeId: "4",
      id: "11",
    },
    {
      title: "**歌劇院蛋糕 Opera Cake**",
      content: `1. 杏仁海綿蛋糕 Joconde
   * 杏仁粉 – 80g
   * 低筋麵粉 – 20g
   * 全蛋 – 2顆
   * 糖粉 – 50g
   * 蛋白 – 3顆
   * 砂糖 – 20g
   * 無鹽奶油 – 20g
2. 咖啡糖液 Coffee Syrup
   * 即溶咖啡 – 5g
   * 砂糖 – 30g
   * 熱水 – 100g
3. 法式奶油霜 French Buttercream
   * 無鹽奶油 – 120g
   * 蛋黃 – 3顆
   * 砂糖 – 60g
   * 水 – 25g
4. 甘納許 Ganache
   * 黑巧克力 – 75g
   * 鮮奶油 – 75g
`,
      badgeId: "2",
      id: "12",
    },
  ];

  const cardBoxes = [
    {
      id: "1",
      title: "CSS 基礎",
      cover_url: "user/card-box-cover-1.png",
      ui: {
        color: "success",
      },
    },
    {
      id: "2",
      title: "React 框架",
      cover_url: "user/card-box-cover-2.png",
      ui: {
        color: "orange",
      },
    },
    {
      id: "3",
      title: "料理基礎",
      cover_url: "user/card-box-cover-3.png",
      ui: {
        color: "secondary",
      },
    },
    {
      id: "4",
      title: "認識自己",
      cover_url: "user/card-box-cover-4.jpg",
      ui: {
        color: "success",
      },
    },
    {
      id: "5",
      title: "規劃與管理",
      cover_url: "user/card-box-cover-5.jpg",
      ui: {
        color: "orange",
      },
    },
  ];

  const badges = cardBoxes.map(({ id, title, ui }) => ({
    id,
    text: title,
    ui: ui.color,
  }));

  return (
    <main>
      <section
        className="text-center pt-20 pb-14 pt-lg-25 pb-lg-30"
        style={{ backgroundColor: "#fafafa" }}
      >
        <div className="container">
          <h2 className="fs-xl text-gray-700 mb-4 fs-md-3xl">
            哈囉！
            <span className="badge badge-lg badge-secondary fs-xl mx-2 lh-base lh-md-sm fs-md-3xl">
              {userInfo.name}
            </span>
            ！
          </h2>
          <h1 className="fs-2xl text-gray-700 mb-13 fs-md-4xl mb-md-16">
            今天有任何靈感嗎？
          </h1>
          <nav className="nav nav-underline justify-content-center mb-10">
            <div
              className="nav-item d-flex"
              id="dashboard-nav-tab"
              role="tablist"
            >
              <button
                className="nav-link mx-3 d-flex align-items-center active"
                id="nav-add-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-add"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                <span className="material-symbols-outlined me-4">
                  {" "}
                  edit_square{" "}
                </span>
                新增卡片
              </button>
              <button
                className="nav-link mx-3 d-flex align-items-center"
                id="nav-search-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-search"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                <span className="material-symbols-outlined me-4"> search </span>
                搜尋卡片
              </button>
            </div>
          </nav>
          <form className="row">
            <div className="tab-content mb-10 col-md-8 mx-md-auto">
              <div
                className="tab-pane fade show active"
                id="nav-add"
                role="tabpanel"
                aria-labelledby="nav-add-tab"
                tabIndex="0"
              >
                <textarea
                  className="form-control dashboard-textarea"
                  id="addCardTextarea"
                  placeholder="請輸入要新增卡片的內容"
                ></textarea>
              </div>
              <div
                className="tab-pane fade"
                id="nav-search"
                role="tabpanel"
                aria-labelledby="nav-search-tab"
                tabIndex="0"
              >
                <textarea
                  className="form-control dashboard-textarea"
                  id="searchCardTextarea"
                  placeholder="請輸入要搜尋卡片的內容"
                ></textarea>
              </div>
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary w-100 w-md-auto fs-md-xl py-md-4 px-md-6"
                type="submit"
              >
                新增
              </button>
            </div>
          </form>
        </div>
      </section>
      <section className="pt-14 pb-6 pt-lg-20 pb-lg-10">
        <div className="container">
          <h2 className="fs-xl lh-base mb-8 pb-6 border-bottom border-gray-200 d-flex align-items-center fs-md-3xl lh-md-sm mb-md-10">
            學習狀態分析
            <a
              className="lh-1 ms-2 ms-md-4"
              data-bs-toggle="collapse"
              href="#chartCollapse"
              role="button"
              aria-expanded="false"
              aria-controls="chartCollapse"
            >
              <span className="material-symbols-outlined align-bottom fs-md-3xl">
                {" "}
                keyboard_arrow_down{" "}
              </span>
            </a>
          </h2>
        </div>
        <div className="collapse show" id="chartCollapse">
          <div className="container mb-lg-10">
            <div className="row gx-6">
              {/* <!-- 圓餅圖 --> */}
              <div className="pie-chart col-12 col-lg-6 col-xl-5 mb-8 mb-lg-0">
                <div className="card bg-gray-0 border-primary-100 rounded-4 h-100">
                  <div className="card-title p-4 mb-0 p-xl-6">
                    <h3 className="fs-l lh-base fw-normal text-primary-900 fs-xl-xl">
                      本月學習主題
                    </h3>
                  </div>
                  <div className="card-body d-flex flex-column flex-sm-row justify-content-center align-items-center py-0 py-sm-4 py-xl-6">
                    <div className="pie-container pe-sm-3">
                      <canvas id="themePie" className="p-3"></canvas>
                    </div>
                    <div className="d-sm-flex align-items-center pt-4 pt-sm-0 ps-sm-3">
                      <ul
                        className="list-unstyled mx-auto mb-2 px-3 d-flex flex-wrap flex-sm-column justify-content-between align-items-center py-1 align-items-sm-start ps-sm-2 pe-sm-0 mb-sm-0"
                        style={{
                          maxWidth: "288px",
                          minWidth: "164px",
                        }}
                      >
                        <li className="w-50 px-2 py-1 py-sm-2 px-sm-0 w-sm-100">
                          <p className="d-flex align-items-center fs-s text-gray-700">
                            <span
                              className="d-block bg-secondary-500 rounded-circle me-2"
                              style={{
                                width: "8px",
                                height: "8px",
                              }}
                            ></span>
                            網頁切板: 70%
                          </p>
                        </li>
                        <li className="w-50 px-2 py-1 py-sm-2 px-sm-0 w-sm-100">
                          <p className="d-flex align-items-center fs-s text-gray-700">
                            <span
                              className="d-block rounded-circle me-2"
                              style={{
                                width: "8px",
                                height: "8px",
                                backgroundColor: "#ff9e69",
                              }}
                            ></span>
                            JavaScrip: 20%
                          </p>
                        </li>
                        <li className="w-50 px-2 py-1 py-sm-2 px-sm-0 w-sm-100">
                          <p className="d-flex align-items-center fs-s text-gray-700">
                            <span
                              className="d-block rounded-circle me-2"
                              style={{
                                width: "8px",
                                height: "8px",
                                backgroundColor: "#fed0a7",
                              }}
                            ></span>
                            料理基礎: 10%
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- 長條圖 --> */}
              <div className="bar-chart col-12 col-lg-6 col-xl-7 mb-8 mb-md-10 mb-lg-0">
                <div className="overflow-scroll scrollbar-none">
                  <div className="card bg-gray-0 border-primary-100 rounded-4">
                    <div className="card-title p-4 mb-0 p-xl-6">
                      <h3 className="fs-l lh-base fw-normal text-primary-900 fs-xl-xl">
                        學習時間 (分)
                      </h3>
                    </div>
                    <div className="bar-container card-body d-flex flex-column p-xl-6">
                      <canvas id="spendTimeBar"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-14 py-lg-20">
        <h2 className="fs-xl mb-8 pb-6 border-bottom border-gray-200 fs-md-3xl lh-md-sm mb-md-10">
          學習進度追蹤
        </h2>
        <div className="scrollbar-none w-100 overflow-scroll mb-8 mb-md-10">
          <nav
            className="nav nav-pills nav-fill gap-6"
            style={{ width: "max-content" }}
          >
            <button
              className="nav-link border border-primary active"
              aria-current="page"
              type="button"
            >
              顯示全部
            </button>
            <button
              className="nav-link border border-primary d-flex align-items-center"
              type="button"
            >
              <span className="material-symbols-outlined me-3">book</span>
              讀書筆記
            </button>
            <button
              className="nav-link border border-primary d-flex align-items-center"
              type="button"
            >
              <span className="material-symbols-outlined me-3">live_tv</span>
              線上課程
            </button>
            <button
              className="nav-link border border-primary d-flex align-items-center"
              type="button"
            >
              <span className="material-symbols-outlined me-3">
                music_video
              </span>
              Podcast
            </button>
          </nav>
        </div>
        <ul className="list-unstyled mb-0 d-flex flex-column gap-6">
          <ProgressList learningResources={learningResources} />
        </ul>
      </section>
      <section className="container py-14 py-lg-20">
        <h2 className="fs-xl mb-8 pb-6 border-bottom border-gray-200 fs-md-3xl lh-md-sm mb-md-10 mb-lg-20">
          常用卡片盒
        </h2>
        <div id="card-box-swiper" className="swiper">
          <div className="swiper-wrapper">
            {cardBoxes.map((cardBox) => (
              <div className="swiper-slide" key={cardBox.id}>
                <CardBox cardBox={cardBox} />
              </div>
            ))}
          </div>
          <div className="mt-20">
            <div className="swiper-scrollbar scrollbar-primary"></div>
          </div>
        </div>
      </section>
      <section className="container py-14 py-lg-20">
        <h2 className="fs-xl mb-8 pb-6 border-bottom border-gray-200 fs-md-3xl lh-md-sm mb-md-10 mb-lg-20">
          最近新增卡片
        </h2>
        <div id="current-cards-swiper" className="swiper overflow-visible">
          <div className="swiper-wrapper">
            <div className="swiper-slide" style={{ width: "300px" }}>
              {lastestCards.map((card) => (
                <BaseCard card={card} badges={badges} key={card.id} />
              ))}
            </div>
          </div>
          <div className="mt-6 mt-md-10">
            <div className="swiper-scrollbar scrollbar-primary"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
