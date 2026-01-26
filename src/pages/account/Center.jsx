import { Link } from "react-router-dom";

export default function Center() {
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
            <h1 className="fs-2xl fs-md-3xl me-2 me-md-6">會員總覽</h1>
          </div>
        </div>

        {/* 訂閱內容 */}
        <section className="mb-10">
          <div className="card border-gray-200">
            <div className="card-body p-md-6">
              <h2 className="fs-xl mb-6">訂閱內容</h2>
              <p className="mb-3">
                <span className="fw-bold text-gray-600">User Name</span>{" "}
                您好，您目前的方案為：
              </p>
              <h3 className="mb-2 fs-2xl text-primary mb-5">Pro 月繳方案</h3>
              <ul className="list-unstyled mb-4">
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
                <Link
                  to="/account/plan/detail"
                  className="link-gray-600 py-2 px-4 ms-auto"
                >
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
          <h2 className="fs-xl mb-6">快速前往</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 gy-4">
            <div className="col">
              <a href="#" className="card quick-link">
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
              <a href="#" className="card quick-link">
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
              <a href="#" className="card quick-link">
                <div className="card-body py-10">
                  <div className="d-flex flex-column align-items-center gap-2">
                    <span className="material-symbols-outlined fs-5xl">
                      lock
                    </span>
                    <p>變更密碼</p>
                  </div>
                </div>
              </a>
            </div>
            <div className="col">
              <a href="#" className="card quick-link">
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
              <a href="#" className="card quick-link">
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
              <a href="#" className="card quick-link">
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
      </div>
    </>
  );
}
