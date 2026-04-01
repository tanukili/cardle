import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProgressList from '@/components/bookshelf/ProgressList';
import BaseCard from '@/components/card/BaseCard';
import CardBox from '@/components/card/CardBox';
import { getDefaultCardBox, createCardBox, getLastestCardBoxes } from '@/services/cardBoxService';
import { getLastestCards } from '@/services/cardService';
import { getActivePlanByUser, createActiveOrder } from '@/services/subscriptionService';
import { showSwalToast } from '@/utils/swalSetting';

import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';

import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';

export default function Dashboard() {
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

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
          title: '預設卡片盒',
          type: 'default',
        });
      } catch (error) {
        if (!cancelled) console.error('Card Box:', error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userInfo?.id]);

  // 取得所需資料
  const [lastestCardBoxes, setLastestCardBoxes] = useState([]);
  const [lastestCards, setLastestCards] = useState([]);
  const [activePlan, setActivePlan] = useState(null);

  useEffect(() => {
    const userId = userInfo?.id;
    if (!userId) return;

    // workaround: 如果沒有訂單，則建立一筆免費訂單
    const setDefaultOrder = async () => {
      try {
        const ts = Math.floor(Date.now() / 1000);
        const orderId = `ord-${ts.toString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000)}`;

        const res = await createActiveOrder({
          planId: 'plan_free',
          id: orderId,
          userId: userInfo.id,
          price: 0,
          subscribeDate: ts,
          nextBillingDate: ts + 30 * 24 * 60 * 60,
          isAutoRenew: true,
          agreedToTerms: true,
          status: 'active',
          paymentMethodId: null,
        });
      } catch (error) {
        console.error('Creating order:', error);
      }
    };

    const getAllData = async () => {
      try {
        const [cardBoxes, cards, activePlan] = await Promise.all([
          getLastestCardBoxes(userId),
          getLastestCards(userId),
          getActivePlanByUser(userId),
        ]);
        setLastestCardBoxes(cardBoxes);
        setLastestCards(cards);
        setActivePlan(activePlan);
        if(!activePlan) {
          setDefaultOrder();
        }
      } catch (error) {
        showSwalToast({ title: '取得資料失敗', variant: 'error' });
        console.error('Fetching data:', error);
      }
    };

    getAllData();
  }, [userInfo?.id]);

  const formatedCards = lastestCards.map((card) => {
    const targetbox = lastestCardBoxes.find((box) => box.id === card.card_box_id);
    return {
      ...card,
      cardBox: {
        color: targetbox?.ui?.color,
        title: targetbox?.title,
      },
    };
  });

  const organizeCardSwiper = (cards) => {
    const result = [];
    let i = 0;
    while (i < cards.length) {
      const currentCard = cards[i];
      const contentLength = currentCard.content.length;
      const contentLine = currentCard.content.split('\n').length;
      const isLongCard = contentLength > 200 || contentLine > 12;

      // 長卡片單獨一組
      if (isLongCard) {
        result.push(currentCard);
        i++;
      }
      if (!isLongCard) {
        // 短卡片抓下一張
        const nextCard = cards[i + 1];
        if (nextCard && !isLongCard) {
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

  // 免費會員遮罩
  const DisableMask = () => {
    if (activePlan?.price > 0) return null;

    return (
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-gray-75 bg-opacity-70 rounded-4 p-4 d-flex flex-column align-items-center justify-content-center">
        <p className="py-4 text-center fs-xl">升級方案後解鎖</p>
        <button className="btn btn-primary" onClick={() => navigate('/account/plan/upgrade')}>
          立即訂閱
        </button>
      </div>
    );
  };

  // TO DO: 以下程式碼待整理
  const learningResources = [
    {
      type: 'book',
      title: '看完這本就會懂！無痛攻克 JavaScript 面試必考觀念與技巧',
      link: '',
      totalUnit: 100,
      completedUnit: 75,
      id: '1',
    },
    {
      type: 'book',
      title: '金魚都能懂的CSS 必學屬性：網頁設計必備寶典',
      link: '',
      totalUnit: 100,
      completedUnit: 50,
      id: '2',
    },
    {
      type: 'video',
      title: 'TypeScript 中文基礎課程',
      link: '',
      totalUnit: 100,
      completedUnit: 25,
      id: '3',
    },
    {
      type: 'podcast',
      title: 'EP629 專案經理只是開會追進度的角色？宰相蕭何教你如何看懂局，成為老闆最倚重的軍師',
      link: 'https://podcasts.apple.com/tw/podcast/ep629-%E5%B0%88%E6%A1%88%E7%B6%93%E7%90%86%E5%8F%AA%E6%98%AF%E9%96%8B%E6%9C%83%E8%BF%BD%E9%80%B2%E5%BA%A6%E7%9A%84%E8%A7%92%E8%89%B2-%E5%AE%B0%E7%9B%B8%E8%95%AD%E4%BD%95%E6%95%99%E4%BD%A0%E5%A6%82%E4%BD%95%E7%9C%8B%E6%87%82%E5%B1%80-%E6%88%90%E7%82%BA%E8%80%81%E9%97%86%E6%9C%80%E5%80%9A%E9%87%8D%E7%9A%84%E8%BB%8D%E5%B8%AB/id1452688611?i=1000741740202',
      totalUnit: 100,
      completedUnit: 100,
      id: '4',
    },
    {
      type: 'book',
      title: '是挑剔還是找碴？從產品開發面探討QA堅守的底線',
      link: 'https://progressbar.tw/posts/239?srsltid=AfmBOooyQpD9_megsssTCc-Tobx6izYkVOKGPcUjJWC9p7yScJmnIZJR',
      totalUnit: 100,
      completedUnit: 0,
      id: '5',
    },
  ];

  const resourceTypes = [
    {
      type: 'book',
      text: '讀書筆記',
      iconName: 'book',
    },
    {
      type: 'video',
      text: '線上課程',
      iconName: 'live_tv',
    },
    {
      type: 'podcast',
      text: 'Podcast',
      iconName: 'music_video',
    },
  ];

  // 圓餅圖數據
  const pieData = [
    {
      id: '網頁切板',
      label: '網頁切板',
      value: 70,
      color: '#4a90e2', // 藍色
    },
    {
      id: 'JavaScript',
      label: 'JavaScript',
      value: 20,
      color: '#ff9e69',
    },
    {
      id: '料理基礎',
      label: '料理基礎',
      value: 10,
      color: '#fed0a7',
    },
  ];

  // 長條圖數據
  const barData = [
    { month: 'Jan', 學習時間: 50 },
    { month: 'Feb', 學習時間: 20 },
    { month: 'Mar', 學習時間: 70 },
    { month: 'Apr', 學習時間: 30 },
    { month: 'May', 學習時間: 140 },
    { month: 'Jun', 學習時間: 180 },
    { month: 'Jul', 學習時間: 80 },
    { month: 'Aug', 學習時間: 100 },
    { month: 'Sep', 學習時間: 40 },
    { month: 'Oct', 學習時間: 10 },
    { month: 'Nov', 學習時間: 30 },
    { month: 'Dec', 學習時間: 100 },
  ];

  return (
    <main className="overflow-hidden">
      <section className="text-center pt-20 pb-14 pt-lg-25 pb-lg-30" style={{ backgroundColor: '#fafafa' }}>
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
              <div className="pie-chart col-lg-6 col-xl-5 mb-8 mb-lg-0 position-relative">
                <div className="card bg-gray-0 border-primary-100 rounded-4 h-100">
                  <div className="card-title p-4 mb-0 p-xl-6">
                    <h3 className="fs-l lh-base fw-normal text-primary-900 fs-xl-xl">本月學習主題</h3>
                  </div>
                  <div className="card-body d-flex flex-column flex-sm-row justify-content-center align-items-center py-0 py-sm-4 py-xl-6">
                    <div className="pie-container pe-sm-3" style={{ height: '200px', width: '200px' }}>
                      <ResponsivePie
                        data={pieData}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        activeOuterRadiusOffset={8}
                        colors={{ datum: 'data.color' }}
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
                          maxWidth: '288px',
                          minWidth: '164px',
                        }}
                      >
                        <li className="w-50 px-2 py-1 py-sm-2 px-sm-0 w-sm-100">
                          <p className="d-flex align-items-center fs-s text-gray-700">
                            <span
                              className="d-block rounded-circle me-2"
                              style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#4a90e2',
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
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#ff9e69',
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
                                width: '8px',
                                height: '8px',
                                backgroundColor: '#fed0a7',
                              }}
                            ></span>
                            料理基礎: 10%
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <DisableMask />
                </div>
              </div>
              {/* <!-- 長條圖 --> */}
              <div className="bar-chart col-lg-6 col-xl-7 mb-8 mb-md-10 mb-lg-0">
                <div className="overflow-scroll scrollbar-none">
                  <div className="card bg-gray-0 border-primary-100 rounded-4">
                    <div className="card-title p-4 mb-0 p-xl-6">
                      <h3 className="fs-l lh-base fw-normal text-primary-900 fs-xl-xl">學習時間 (分)</h3>
                    </div>
                    <div className="bar-container card-body d-flex flex-column p-xl-6" style={{ height: '300px' }}>
                      <ResponsiveBar
                        data={barData}
                        keys={['學習時間']}
                        indexBy="month"
                        margin={{ top: 20, right: 20, bottom: 50, left: 40 }}
                        padding={0.55}
                        valueScale={{ type: 'linear' }}
                        indexScale={{ type: 'band', round: true }}
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
                    <DisableMask />
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
          <nav className="nav nav-pills nav-fill gap-6" style={{ width: 'max-content' }}>
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
          slidesPerView={'auto'}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          watchOverflow={true}
          scrollbar={{
            draggable: true,
            el: '.swiper-scrollbar',
          }}
        >
          {lastestCardBoxes.map((cardBox) => (
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
          slidesPerView={'auto'}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          watchOverflow={true}
          scrollbar={{
            draggable: true,
            el: '.swiper-scrollbar',
          }}
        >
          {displayCardSwiper.map((swiperItem) => (
            <SwiperSlide style={{ width: '300px' }} className="d-flex flex-column gap-4">
              {Array.isArray(swiperItem) ? (
                swiperItem.map((card) => <BaseCard card={card} key={card.id} mode="withBadge" />)
              ) : (
                <BaseCard card={swiperItem} key={swiperItem.id} mode="withBadge" />
              )}
            </SwiperSlide>
          ))}
          {displayCardSwiper.length < 8 && (
            <SwiperSlide className=" d-flex align-items-center h-auto" style={{ width: '300px' }}>
              <div className="bg-primary-0 rounded-4 p-4 w-100 d-flex flex-column align-items-center justify-content-center min-h-75">
                <p className="py-6 text-center text-gray-500">沒有更多卡片了。</p>
                <button className="btn btn-outline-primary" onClick={() => navigate('/user/card-boxes')}>
                  立即新增
                </button>
              </div>
            </SwiperSlide>
          )}
          <div className="swiper-scrollbar scrollbar-primary mt-6 mt-md-10"></div>
        </Swiper>
      </section>
    </main>
  );
}
