import { Link } from "react-router-dom";
import PersonalPlanSwiper from "../../components/swiper/PersonalPlanSwiper";

export default function PlanUpgrade() {
  return (
    <>
      <div className="px-1 px-xl-6 pt-6 pb-10">
        <div className="mb-10">
          <Link
            to="/user"
            className="link-gray-600 fs-s fs-md-m py-1 py-md-2 ps-0 pe-2 px-md-4 mb-4 mb-md-10"
          >
            <span className="material-symbols-outlined align-bottom fs-m fs-md-2xl me-2_5 me-md-3">
              arrow_back_ios
            </span>
            返回個人儀表板
          </Link>
          <div className="d-flex align-items-center pb-6 border-bottom border-gray-200">
            <h1 className="fs-2xl fs-md-3xl me-2 me-md-6">升級方案</h1>
          </div>
        </div>

        {/* <section>
          <div className="d-flex justify-content-center gap-4 mb-16">
            <input
              type="radio"
              className="btn-check"
              name="upgrade-plan"
              id="plan1"
              autoComplete="off"
            />
            <label className="card card-label px-5 py-8" htmlFor="plan1">
              <div className="card-body d-flex flex-column">
                <div>
                  <h2 className="fs-xl mb-6">Free 免費方案</h2>
                  <ul className="list-unstyled mb-8">
                    <li className="mb-2">
                      <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                        check
                      </span>
                      <span className="text-gray-1000">建立筆記卡片</span>
                    </li>
                    <li className="mb-2">
                      <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                        check
                      </span>
                      <span className="text-gray-1000">建立書單</span>
                    </li>
                    <li className="mb-2">
                      <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                        check
                      </span>
                      <span className="text-gray-1000">標籤分類</span>
                    </li>
                  </ul>
                </div>
                <h3 className="fs-l mt-auto text-center">NT$ 0</h3>
              </div>

              <p className="fs-s current-plan"></p>
            </label>

            <input
              type="radio"
              className="btn-check"
              name="upgrade-plan"
              id="plan2"
              autoComplete="off"
            />
            <label className="card card-label px-5 py-8" htmlFor="plan2">
              <div className="card-body d-flex flex-column">
                <div>
                  <h2 className="fs-xl mb-6">Pro 月繳方案</h2>
                  <ul className="list-unstyled mb-8">
                    <li className="mb-2">
                      <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                        check
                      </span>
                      <span className="text-gray-1000">建立筆記卡片</span>
                    </li>
                    <li className="mb-2">
                      <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                        check
                      </span>
                      <span className="text-gray-1000">建立書單</span>
                    </li>
                    <li className="mb-2">
                      <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                        check
                      </span>
                      <span className="text-gray-1000">標籤分類</span>
                    </li>
                    <li className="mb-2">
                      <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                        check
                      </span>
                      <span className="text-gray-1000">視覺化關聯地圖</span>
                    </li>
                    <li className="mb-2">
                      <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                        check
                      </span>
                      <span className="text-gray-1000">進度追蹤與提醒</span>
                    </li>
                  </ul>
                </div>
                <h3 className="fs-l mt-auto text-center">NT$ 120 / 月</h3>
              </div>

              <p className="fs-s current-plan">目前方案</p>
            </label>

            <input
              type="radio"
              className="btn-check"
              name="upgrade-plan"
              id="plan3"
              autoComplete="off"
              defaultChecked
            />
            <label className="card card-label px-5 py-8" htmlFor="plan3">
              <div className="card-body d-flex flex-column">
                <div>
                  <h2 className="fs-xl mb-6">Pro 年繳方案</h2>
                  <ul className="list-unstyled mb-8">
                    <li className="mb-2">
                      <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                        check
                      </span>
                      <span className="text-gray-1000">建立筆記卡片</span>
                    </li>
                    <li className="mb-2">
                      <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                        check
                      </span>
                      <span className="text-gray-1000">建立書單</span>
                    </li>
                    <li className="mb-2">
                      <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                        check
                      </span>
                      <span className="text-gray-1000">標籤分類</span>
                    </li>
                    <li className="mb-2">
                      <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                        check
                      </span>
                      <span className="text-gray-1000">視覺化關聯地圖</span>
                    </li>
                    <li className="mb-2">
                      <span className="material-symbols-outlined align-bottom text-gray-500 me-2">
                        check
                      </span>
                      <span className="text-gray-1000">進度追蹤與提醒</span>
                    </li>
                  </ul>
                </div>
                <h3 className="fs-l mt-auto text-center">NT$ 1,200 / 年</h3>
              </div>

              <p className="fs-s current-plan"></p>
            </label>
          </div>

          <div className="d-flex justify-content-center gap-4">
            <button type="button" className="btn btn-outline-primary">
              返回
            </button>
            <button type="button" className="btn btn-primary">
              升級方案
            </button>
          </div>
        </section> */}
        <PersonalPlanSwiper />
      </div>
    </>
  );
}
