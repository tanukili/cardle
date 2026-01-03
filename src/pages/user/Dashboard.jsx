import ProgressList from "@/components/bookshelf/ProgressList";
import BaseCard from "@/components/card/BaseCard";

export default function Dashboard() {
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
      title: "**常見單位（px, %, rem）**",
      content: `px：固定像素  
%：相對於父元素  
rem：相對於 root font size`,
    },
    {
      badgeId: "1",
      title: "**實用建議**",
      content: `* 響應式設計：建議優先使用 rem + % + vw/vh 的組合  
* 元件內縮放：用 em 可以讓文字隨父層等比縮放  
* 精準控制：設計系統中仍可用 px 做細節調整`,
    },
    {
      badgeId: "2",
      title: "**和風醬汁：醬油 × 味醂 × 高湯**",
      content: `常見比例為：  
1（醬油）：1（味醂）：2（高湯）  

---  

可用於燉煮、壽喜燒、烏龍麵湯底，味醂帶甜味並增加照面光澤。`,
    },
    {
      badgeId: "2",
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
    },
    {
      title: "**props vs state**",
      content: `props 是由父元件傳入的資料。  
    state 是元件內部的狀態，可被修改。`,
      badgeId: "3",
    },
    {
      title: "**Flexbox（彈性盒子）**",
      content: `\`display: flex;\`  
    是現代網頁常用的排版方式之一，能夠快速讓元素水平或垂直對齊`,
      badgeId: "1",
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
    },
    {
      title: "**《我得了不想上班的病》- 倦怠 3 種類型：**",
      content: `1. 過勞
2. 社交疲憊
3. 無聊萎靡
`,
      badgeId: "4",
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
    },
  ];

  const badges = [
    {
      id: "1",
      text: "CSS 基礎",
      ui: "success",
    },
    {
      id: "2",
      text: "料理基礎",
      ui: "secondary",
    },
    {
      id: "3",
      text: "React",
      ui: "orange",
    },
    {
      id: "4",
      text: "認識自己",
      ui: "success",
    },
  ];

  return (
    <main>
      <h1>6. 個人筆記儀表板</h1>
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
          最近新增卡片
        </h2>
        <div id="current-cards-swiper" className="swiper overflow-visible">
          <div className="swiper-wrapper">
            <div className="swiper-slide" style={{ width: "300px" }}>
              {lastestCards.map((card) => (
                <BaseCard card={card} badges={badges} />
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
