import { Link } from "react-router-dom";

export default function PlanDetail() {
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
            <h1 className="fs-2xl fs-md-3xl me-2 me-md-6">方案明細</h1>
            <p className="fs-xs fs-md-m fw-bold text-secondary">
              現在使用的方案
            </p>
          </div>
        </div>

        <section>
          <div className="card border-gray-200 mb-10">
            <div className="card-body p-6 p-md-8">
              <h3 className="fs-2xl pb-4 mb-6 border-bottom">Pro 月繳方案</h3>
              <ul className="list-unstyled mb-10">
                <li className="mb-2">
                  加入日期：<span>2020 年 08 月 09 日</span>
                </li>
                <li className="mb-2">
                  自動續訂日期：<span>2025 年 08 月 09 日</span>
                </li>
                <li>
                  費用：NT$ <span>120 / 月</span>
                </li>
              </ul>

              <div>
                <h4 className="fs-l pb-4 border-bottom mb-6">
                  方案功能與上限說明
                </h4>
                <ol className="mb-12">
                  <li className="mb-1">
                    無限制建立筆記卡片：沒有張數限制，靈感再多也能全部記下來，打造屬於你的知識庫。
                  </li>
                  <li className="mb-1">
                    無限制建立書單：想追的書、學的主題再多都沒問題，隨心所欲整理你的閱讀計畫。
                  </li>
                  <li className="mb-1">
                    標籤分類：支援 標籤分類管理，簡單歸納每一筆知識。
                  </li>
                  <li className="mb-1">
                    視覺化關聯地圖：將筆記之間的連結一目了然，幫助你建立屬於自己的知識網絡。
                  </li>
                  <li className="mb-1">
                    進度追蹤與提醒：一起養成穩定學習習慣！追蹤閱讀進度，還能設定提醒不怕忘記。
                  </li>
                  <li>
                    隨時取消：無綁約壓力，可隨時取消訂閱，依照你的學習節奏自由彈性使用。
                  </li>
                </ol>
              </div>
              <div className="d-flex justify-content-end align-items-center gap-2">
                <p>想要最優惠的方案？</p>
                <Link to="/account/plan/upgrade" className="btn btn-primary">
                  立刻升級
                </Link>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-4">
            <button type="button" className="btn btn-outline-primary">
              返回
            </button>
            <button type="button" className="btn btn-outline-primary">
              取消訂閱
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
