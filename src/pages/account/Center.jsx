import { Link } from "react-router-dom";

export default function Center() {
  return (
    <>
      <h1 className="mb-10">會員總覽</h1>
      {/* 訂閱內容 */}
      <section className="mb-10">
        <h2 className="fs-xl mb-4">訂閱內容</h2>
        <div className="card">
          <div className="card-body p-8">
            <p className="mb-3">
              <span>User Name</span> 您好，您目前使用的方案為：
            </p>
            <h3 className="mb-2 fs-2xl">Pro 月繳方案</h3>
            <ul className="list-unstyled mb-0">
              <li className="mb-1">
                下次付款日期：<span>2025 年 08 月 09 日</span>
              </li>
              <li className="mb-1">
                費用：<span>NT$120 / 月</span>
              </li>
              <li className="mb-1">
                付款方式：<span>信用卡</span>
              </li>
            </ul>
            <div className="d-flex justify-content-end">
              <Link to="/account/plan/detail" className="link-primary">
                方案明細
                <span className="material-symbols-outlined align-bottom ms-1">
                  arrow_right_alt
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 快速連結 */}
      <section>
        <h2 className="fs-xl mb-4">快速前往</h2>
        <div className="row row-cols-3 gy-4">
          <div className="col">
            <a href="#" className="card">
              <div className="card-body py-10">
                <div className="d-flex flex-column align-items-center gap-2">
                  <span className="material-symbols-outlined fs-5xl">
                    arrow_circle_up
                  </span>
                  <p>升級方案</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col">
            <a href="#" className="card">
              <div className="card-body py-10">
                <div className="d-flex flex-column align-items-center gap-2">
                  <span className="material-symbols-outlined fs-5xl">
                    credit_card
                  </span>
                  <p>變更付款方式</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col">
            <a href="#" className="card">
              <div className="card-body py-10">
                <div className="d-flex flex-column align-items-center gap-2">
                  <span className="material-symbols-outlined fs-5xl">lock</span>
                  <p>變更密碼</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col">
            <a href="#" className="card">
              <div className="card-body py-10">
                <div className="d-flex flex-column align-items-center gap-2">
                  <span className="material-symbols-outlined fs-5xl">
                    settings
                  </span>
                  <p>個人化設定</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col">
            <a href="#" className="card">
              <div className="card-body py-10">
                <div className="d-flex flex-column align-items-center gap-2">
                  <span className="material-symbols-outlined fs-5xl">
                    bar_chart
                  </span>
                  <p>檢視使用量</p>
                </div>
              </div>
            </a>
          </div>
          <div className="col">
            <a href="#" className="card">
              <div className="card-body py-10">
                <div className="d-flex flex-column align-items-center gap-2">
                  <span className="material-symbols-outlined fs-5xl">
                    headset_mic
                  </span>
                  <p>聯繫客服</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
