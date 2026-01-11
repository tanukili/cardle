import { Link } from "react-router-dom";

export default function PlanDetail() {
  return (
    <>
      <h1 className="mb-10">方案明細</h1>
      <section>
        <h2 className="fs-xl mb-4">現在使用的方案</h2>
        <div className="card mb-10">
          <div className="card-body p-8">
            <h3 className="fs-2xl pb-2 mb-4 border-bottom">Pro 月繳方案</h3>
            <ul className="list-unstyled mb-8">
              <li>
                加入日期：<span>2020 年 08 月 09 日</span>
              </li>
              <li>
                自動續訂日期：<span>2025 年 08 月 09 日</span>
              </li>
              <li>
                費用：NT$ <span>120 / 月</span>
              </li>
            </ul>

            <div>
              <h4 className="fs-l pb-2 border-bottom mb-4">
                方案功能與上限說明
              </h4>
              <ol className="mb-12">
                <li>
                  無限制建立筆記卡片：沒有張數限制，靈感再多也能全部記下來，打造屬於你的知識庫。
                </li>
                <li>
                  無限制建立書單：想追的書、學的主題再多都沒問題，隨心所欲整理你的閱讀計畫。
                </li>
                <li>標籤分類：支援 標籤分類管理，簡單歸納每一筆知識。</li>
                <li>
                  視覺化關聯地圖：將筆記之間的連結一目了然，幫助你建立屬於自己的知識網絡。
                </li>
                <li>
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
    </>
  );
}
