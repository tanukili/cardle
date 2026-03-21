import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ProgressList from "@/components/bookshelf/ProgressList";
import BaseCard from "@/components/card/BaseCard";
import CardBox from "@/components/card/CardBox";
import { getDefaultCardBox, createCardBox } from "@/services/cardBoxService";

import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";

import { ResponsivePie } from "@nivo/pie";
import { ResponsiveBar } from "@nivo/bar";

export default function Dashboard() {
  const userInfo = useSelector((state) => state.user.userInfo);

  // 前端處理預設卡片盒邏輯
  useEffect(() => {
    const userId = userInfo?.id;
    if (!userId) return;

    let cancelled = false;

    (async () => {
      try {
        const res = await getDefaultCardBox(userId);
        if (cancelled) return;
        if (res.length > 0) return;

        await createCardBox({
          user_id: userId,
          title: "預設卡片盒",
          type: "default",
        });
      } catch (error) {
        if (!cancelled) console.error("Card Box:", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userInfo?.id]);

  // 以下程式碼待整理
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
      title: "EP629 專案經理只是開會追進度的角色？宰相蕭何教你如何看懂局，成為老闆最倚重的軍師",
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

  const resourceTypes = [
    {
      type: "book",
      text: "讀書筆記",
      iconName: "book",
    },
    {
      type: "video",
      text: "線上課程",
      iconName: "live_tv",
    },
    {
      type: "podcast",
      text: "Podcast",
      iconName: "music_video",
    },
  ];

  const boxes = [
    {
      id: "card_box_3",
      title: "TypeScript 基礎",
      description: "",
      cover_url: "user/card-box-cover-1.png",
      type: "normal",
      is_inbox: false,
      is_archived: false,
      is_favorite: false,
      created_at: 1766833200,
      updated_at: 1770215310,
      ui: {
        color: "success",
      },
    },
  ];

  const lastestCards = [
    {
      id: "card_001",
      title: "常見單位（px, %, rem）",
      user_id: "X-gJy7b",
      card_box_id: "card_box_3",
      tags: [],
      content: "px：固定像素  \n%：相對於父元素  \nrem：相對於 root font size  \n使用 rem 可以更靈活響應式。",
      content_format: "plain",
      created_at: 1738675200,
      updated_at: 1738761600,
      status: "active",
    },
    {
      id: "card_002",
      title: "實用建議",
      user_id: "X-gJy7b",
      card_box_id: "card_box_3",
      tags: [],
      content:
        "* 響應式設計：建議優先使用 rem + % + vw/vh 的組合  \n* 元件內縮放：用 em 可以讓文字隨父層等比縮放  \n* 精準控制：設計系統中仍可用 px 做細節調整",
      content_format: "plain",
      created_at: 1738675200,
      updated_at: 1738675200,
      status: "active",
    },
    {
      id: "card_003",
      title: "和風醬汁：醬油 × 味醂 × 高湯",
      user_id: "X-gJy7b",
      card_box_id: "card_box_3",
      tags: [],
      content:
        "常見比例為：  \n1（醬油）：1（味醂）：2（高湯）  \n\n---  \n\n可用於燉煮、壽喜燒、烏龍麵湯底，味醂帶甜味並增加照面光澤。",
      content_format: "plain",
      created_at: 1738675200,
      updated_at: 1738848000,
      status: "active",
    },
    {
      id: "card_004",
      title: "黃金比例：醬油 × 糖 × 米酒",
      user_id: "X-gJy7b",
      card_box_id: "card_box_3",
      tags: [],
      content:
        "適用於台式紅燒料理，常見比例為：  \n1（醬油）：1（糖）：1（米酒）  \n\n---  \n\n醬油提鹹香、糖增加焦化風味、米酒去腥提味。  \n👉 也可加入少許水稀釋，適用於紅燒肉、紅燒豆腐等。",
      content_format: "plain",
      created_at: 1738675200,
      updated_at: 1738675200,
      status: "active",
    },
    {
      id: "card_005",
      title: "麻婆豆腐食譜（2-3人份）",
      user_id: "X-gJy7b",
      card_box_id: "card_box_3",
      tags: [],
      content:
        "食材準備：  \n* 嫩豆腐：1盒（約300g，建議用棉豆腐或北豆腐）\n* 牛／豬絞肉：100g\n* 蒜末：2瓣\n* 薑末：1小匙\n* 蔥花：適量（分開蔥白與蔥綠）\n* 豆瓣醬：1.5 大\n* 醬油：1 大匙\n* 料酒：1 大匙\n* 水：200ml\n* 太白粉水：1大匙粉＋1大匙水混合\n* 花椒粉／油：1/2 小匙\n* 辣椒粉或辣椒油：依個人口味\n* 香油：少許",
      content_format: "plain",
      created_at: 1738675200,
      updated_at: 1738934400,
      status: "active",
    },
    {
      id: "card_006",
      title: "props vs state",
      user_id: "X-gJy7b",
      card_box_id: "card_box_3",
      tags: [],
      content: "props 是由父元件傳入的資料。  \n    state 是元件內部的狀態，可被修改。",
      content_format: "plain",
      created_at: 1738675200,
      updated_at: 1738675200,
      status: "active",
    },
    {
      id: "card_007",
      title: "useState — 狀態管理入門",
      user_id: "X-gJy7b",
      card_box_id: "card_box_3",
      tags: [],
      content:
        "用來宣告與更新元件內的狀態  \n```javascript\nconst [count, setCount] = useState(0);\nsetCount(count + 1);\n```  \n每次 `setCount` 呼叫後元件會重新渲染。",
      content_format: "plain",
      created_at: 1738675200,
      updated_at: 1739020800,
      status: "active",
    },
    {
      id: "card_008",
      title: "Flexbox（彈性盒子）",
      user_id: "X-gJy7b",
      card_box_id: "card_box_3",
      tags: [],
      content: "`display: flex;`  \n    是現代網頁常用的排版方式之一，能夠快速讓元素水平或垂直對齊",
      content_format: "plain",
      created_at: 1738675200,
      updated_at: 1738675200,
      status: "active",
    },
    {
      id: "card_009",
      title: "Box Model（盒模型）",
      user_id: "X-gJy7b",
      card_box_id: "card_box_3",
      tags: [],
      content:
        "CSS 的每個元素都像一個盒子，由以下幾個部分構成（由內而外）：  \n`[margin] [border] [padding] [content]`  \n\n---\n\n* `content`元素實際內容，如文字、圖片等\n* `padding`內容與邊框之間的間距\n* `border`元素的邊框\n* `margin`元素與外部其他元素之間的距離",
      content_format: "plain",
      created_at: 1738675200,
      updated_at: 1739107200,
      status: "active",
    },
    {
      id: "card_010",
      title: "《我得了不想上班的病》- 倦怠 3 種類型：",
      user_id: "X-gJy7b",
      card_box_id: "card_box_3",
      tags: [],
      content: "1. 過勞\n2. 社交疲憊\n3. 無聊萎靡\n",
      content_format: "plain",
      created_at: 1738675200,
      updated_at: 1738675200,
      status: "active",
    },
    {
      id: "card_011",
      title: "過勞型倦怠",
      user_id: "X-gJy7b",
      card_box_id: "card_box_3",
      tags: [],
      content:
        "一直處與工作狀態、全職育兒的人的身上。過度努力、有責任感。\n\n---\n常見跡象： \n1. 主客觀來看都很忙\n2. 時間總是不夠\n3. 跟不上的焦慮或內疚\n4. 這陣子忙完就好\n",
      content_format: "plain",
      created_at: 1738675200,
      updated_at: 1739193600,
      status: "active",
    },
    {
      id: "card_012",
      title: "歌劇院蛋糕 Opera Cake",
      user_id: "X-gJy7b",
      card_box_id: "card_box_3",
      tags: [],
      content:
        "1. 杏仁海綿蛋糕 Joconde\n   * 杏仁粉 – 80g\n   * 低筋麵粉 – 20g\n   * 全蛋 – 2顆\n   * 糖粉 – 50g\n   * 蛋白 – 3顆\n   * 砂糖 – 20g\n   * 無鹽奶油 – 20g\n2. 咖啡糖液 Coffee Syrup\n   * 即溶咖啡 – 5g\n   * 砂糖 – 30g\n   * 熱水 – 100g\n3. 法式奶油霜 French Buttercream\n   * 無鹽奶油 – 120g\n   * 蛋黃 – 3顆\n   * 砂糖 – 60g\n   * 水 – 25g\n4. 甘納許 Ganache\n   * 黑巧克力 – 75g\n   * 鮮奶油 – 75g\n",
      content_format: "plain",
      created_at: 1738675200,
      updated_at: 1738675200,
      status: "active",
    },
  ];

  const formatedCards = lastestCards.map((card) => {
    const targetbox = boxes.find((box) => box.id === card.card_box_id);
    return {
      ...card,
      cardBox: {
        color: targetbox.ui.color,
        title: targetbox.title,
      },
    };
  });

  const countRows = (content) => (content.match(/\n/g) || []).length + 1;

  const organizeCardSwiper = (cards) => {
    const result = [];
    const maxRows = 9;
    let i = 0;
    while (i < cards.length) {
      const currentCard = cards[i];
      const currentRowCount = countRows(currentCard.content);

      // 長卡片單獨一組
      if (currentRowCount > maxRows) {
        result.push(currentCard);
        i++;
      } else {
        // 短卡片嘗試抓下一張
        const nextCard = cards[i + 1];

        if (nextCard && countRows(nextCard.content) <= maxRows) {
          // 也是短卡片，合併
          result.push([currentCard, nextCard]);
          i += 2;
        } else {
          // 沒有下一張，或是下一張是長卡片
          result.push([currentCard]);
          i++;
        }
      }
    }
    return result;
  };

  const displayCardSwiper = organizeCardSwiper(formatedCards);

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
      id: "3",
      title: "React 框架",
      cover_url: "user/card-box-cover-2.png",
      ui: {
        color: "orange",
      },
    },
    {
      id: "2",
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

  // 圓餅圖數據
  const pieData = [
    {
      id: "網頁切板",
      label: "網頁切板",
      value: 70,
      color: "#4a90e2", // 藍色
    },
    {
      id: "JavaScript",
      label: "JavaScript",
      value: 20,
      color: "#ff9e69",
    },
    {
      id: "料理基礎",
      label: "料理基礎",
      value: 10,
      color: "#fed0a7",
    },
  ];

  // 長條圖數據
  const barData = [
    { month: "Jan", 學習時間: 50 },
    { month: "Feb", 學習時間: 20 },
    { month: "Mar", 學習時間: 70 },
    { month: "Apr", 學習時間: 30 },
    { month: "May", 學習時間: 140 },
    { month: "Jun", 學習時間: 180 },
    { month: "Jul", 學習時間: 80 },
    { month: "Aug", 學習時間: 100 },
    { month: "Sep", 學習時間: 40 },
    { month: "Oct", 學習時間: 10 },
    { month: "Nov", 學習時間: 30 },
    { month: "Dec", 學習時間: 100 },
  ];

  return (
    <main className="overflow-hidden">
      <section className="text-center pt-20 pb-14 pt-lg-25 pb-lg-30" style={{ backgroundColor: "#fafafa" }}>
        <div className="container">
          <h2 className="fs-xl text-gray-700 mb-4 fs-md-3xl">
            哈囉！
            <span className="badge badge-lg badge-secondary fs-xl mx-2 lh-base lh-md-sm fs-md-3xl">
              {userInfo.username}
            </span>
            ！
          </h2>
          <h1 className="fs-2xl text-gray-700 mb-13 fs-md-4xl mb-md-16">今天有任何靈感嗎？</h1>
          <nav className="nav nav-underline justify-content-center mb-10">
            <div className="nav-item d-flex" id="dashboard-nav-tab" role="tablist">
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
                <span className="material-symbols-outlined me-4"> edit_square </span>
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
              <button className="btn btn-primary w-100 w-md-auto fs-md-xl py-md-4 px-md-6" type="submit">
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
              <span className="material-symbols-outlined align-bottom fs-md-3xl"> keyboard_arrow_down </span>
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
                    <h3 className="fs-l lh-base fw-normal text-primary-900 fs-xl-xl">本月學習主題</h3>
                  </div>
                  <div className="card-body d-flex flex-column flex-sm-row justify-content-center align-items-center py-0 py-sm-4 py-xl-6">
                    <div className="pie-container pe-sm-3" style={{ height: "200px", width: "200px" }}>
                      <ResponsivePie
                        data={pieData}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        activeOuterRadiusOffset={8}
                        colors={{ datum: "data.color" }}
                        borderWidth={0}
                        enableArcLinkLabels={false}
                        enableArcLabels={false}
                        isInteractive={false}
                      />
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
                              className="d-block rounded-circle me-2"
                              style={{
                                width: "8px",
                                height: "8px",
                                backgroundColor: "#4a90e2",
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
                            JavaScript: 20%
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
                      <h3 className="fs-l lh-base fw-normal text-primary-900 fs-xl-xl">學習時間 (分)</h3>
                    </div>
                    <div className="bar-container card-body d-flex flex-column p-xl-6" style={{ height: "300px" }}>
                      <ResponsiveBar
                        data={barData}
                        keys={["學習時間"]}
                        indexBy="month"
                        margin={{ top: 20, right: 20, bottom: 50, left: 40 }}
                        padding={0.3}
                        valueScale={{ type: "linear" }}
                        indexScale={{ type: "band", round: true }}
                        colors="#4a90e2"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                        }}
                        axisLeft={{
                          tickSize: 5,
                          tickPadding: 5,
                          tickRotation: 0,
                        }}
                        borderRadius={8}
                        enableLabel={false}
                        animate={true}
                        motionConfig="gentle"
                        role="application"
                        barAriaLabel={(e) => `${e.id}: ${e.formattedValue} 分鐘`}
                        ariaLabel="學習時間長條圖"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-14 py-lg-20">
        <h2 className="fs-xl mb-8 pb-6 border-bottom border-gray-200 fs-md-3xl lh-md-sm mb-md-10">學習進度追蹤</h2>
        <div className="scrollbar-none w-100 overflow-scroll mb-8 mb-md-10">
          <nav className="nav nav-pills nav-fill gap-6" style={{ width: "max-content" }}>
            <button className="nav-link border border-primary active" aria-current="page" type="button">
              顯示全部
            </button>
            {resourceTypes.map(({ type, text, iconName }) => (
              <button className="nav-link border border-primary d-flex align-items-center" type="button" key={type}>
                <span className="material-symbols-outlined me-3">{iconName}</span>
                {text}
              </button>
            ))}
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
        <Swiper
          className="card-box-swiper"
          modules={[Scrollbar]}
          spaceBetween={24}
          slidesPerView={"auto"}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          watchOverflow={true}
          scrollbar={{
            draggable: true,
            el: ".swiper-scrollbar",
          }}
        >
          {cardBoxes.map((cardBox) => (
            <SwiperSlide key={cardBox.id}>
              <CardBox cardBox={cardBox} />
            </SwiperSlide>
          ))}
          <div className="swiper-scrollbar scrollbar-primary mt-20"></div>
        </Swiper>
      </section>
      <section className="container py-14 py-lg-20">
        <h2 className="fs-xl mb-8 pb-6 border-bottom border-gray-200 fs-md-3xl lh-md-sm mb-md-10 mb-lg-20">
          最近新增卡片
        </h2>
        <Swiper
          className="current-cards-swiper overflow-visible"
          modules={[Scrollbar]}
          spaceBetween={16}
          breakpoints={{
            1200: { spaceBetween: 40 },
          }}
          slidesPerView={"auto"}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          watchOverflow={true}
          scrollbar={{
            draggable: true,
            el: ".swiper-scrollbar",
          }}
        >
          {displayCardSwiper.map((swiperItem) => (
            <SwiperSlide style={{ width: "300px" }} className="d-flex flex-column gap-4">
              {Array.isArray(swiperItem) ? (
                swiperItem.map((card) => <BaseCard card={card} key={card.id} mode="withBadge" />)
              ) : (
                <BaseCard card={swiperItem} key={swiperItem.id} mode="withBadge" />
              )}
            </SwiperSlide>
          ))}
          <div className="swiper-scrollbar scrollbar-primary mt-6 mt-md-10"></div>
        </Swiper>
      </section>
    </main>
  );
}
