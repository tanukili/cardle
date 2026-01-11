import { Link } from "react-router-dom";

export default function Plan() {
  return (
    <>
      <h1 className="mb-10">個人方案</h1>
      {/* 訂閱方案內容 */}
      <section className="mb-10">
        <h2 className="fs-xl mb-4">我的方案</h2>
        <div className="d-flex justify-content-between mb-2">
          <p>方案將於 2025 年 08 月 09 日 自動續訂</p>
          <Link to="/account/plan/detail" className="link-primary">
            方案明細
            <span className="material-symbols-outlined align-bottom ms-1">
              arrow_right_alt
            </span>
          </Link>
        </div>
        <div className="card">
          <div className="card-body p-8">
            <h3 className="fs-2xl pb-2 mb-4 border-bottom">Pro 月繳方案</h3>
            <ul className="list-unstyled mb-4">
              <li className="mb-1">
                <span className="material-symbols-outlined align-bottom me-2">
                  check
                </span>
                無限制建立筆記卡片
              </li>
              <li className="mb-1">
                <span className="material-symbols-outlined align-bottom me-2">
                  check
                </span>
                無限制建立書單
              </li>
              <li className="mb-1">
                <span className="material-symbols-outlined align-bottom me-2">
                  check
                </span>
                標籤分類
              </li>
              <li className="mb-1">
                <span className="material-symbols-outlined align-bottom me-2">
                  check
                </span>
                視覺化關聯地圖
              </li>
              <li className="mb-1">
                <span className="material-symbols-outlined align-bottom me-2">
                  check
                </span>
                進度追蹤與提醒
              </li>
            </ul>
            <p className="fs-xl text-end mb-4">
              NT$<span>120</span> / <span>月</span>
            </p>
            <button type="button" className="btn btn-primary d-block mx-auto">
              升級方案
            </button>
          </div>
        </div>
      </section>

      {/* 付款資訊 */}
      <section>
        <h2 className="fs-xl mb-4">付款資訊</h2>
        <div className="card">
          <div className="card-body p-8">
            <p className="mb-3">
              下次付款日期：<span>2025 年 08 月 31日</span>
            </p>
            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
              <p className="mb-3">
                付款方式：
                <span className="material-symbols-outlined align-bottom me-1">
                  credit_card
                </span>
                <span className="me-2">MasterCard</span>
                <span>**** **** 1234</span>
              </p>
              <button type="button" className="btn btn-primary">
                管理
              </button>
            </div>
            <button
              type="button"
              className="btn w-100 px-0 border-0 payment-toggle"
              data-bs-toggle="collapse"
              data-bs-target="#payment-record-collapse"
              aria-expanded="true"
              aria-controls="payment-record-collapse"
            >
              <div className="d-flex justify-content-between align-items-center">
                <span>付款紀錄</span>
                <span className="material-symbols-outlined icon-collapsed">
                  keyboard_arrow_right
                </span>
                <span className="material-symbols-outlined icon-expanded">
                  keyboard_arrow_down
                </span>
              </div>
            </button>
            <div className="collapse show" id="payment-record-collapse">
              <table className="table mb-4">
                <thead>
                  <tr>
                    <th scope="col">付款日期</th>
                    <th scope="col">付款內容</th>
                    <th scope="col">付款方式</th>
                    <th scope="col">發票</th>
                    <th scope="col">帳單金額</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2025/07/09</td>
                    <td>2025/07/09 - 2025/08/08 Pro 月繳</td>
                    <td>
                      <span className="material-symbols-outlined align-bottom me-1">
                        credit_card
                      </span>
                      信用卡
                    </td>
                    <td>
                      <button type="button" className="btn btn-outline-primary">
                        檢視
                      </button>
                    </td>
                    <td>NT$ 120</td>
                  </tr>
                  <tr>
                    <td>2024/07/09</td>
                    <td>2024/07/09 - 2025/07/08 Pro 年繳</td>
                    <td>
                      <span className="material-symbols-outlined align-bottom me-1">
                        credit_card
                      </span>
                      信用卡
                    </td>
                    <td>
                      <button type="button" className="btn btn-outline-primary">
                        檢視
                      </button>
                    </td>
                    <td>NT$ 1,200</td>
                  </tr>
                  <tr>
                    <td>2404/06/09</td>
                    <td>2025/06/09 - 2025/07/08 Pro 月繳</td>
                    <td>行動支付</td>
                    <td>
                      <button type="button" className="btn btn-outline-primary">
                        檢視
                      </button>
                    </td>
                    <td>NT$ 120</td>
                  </tr>
                  <tr>
                    <td>2404/05/09</td>
                    <td>2025/05/09 - 2025/06/08 Pro 月繳</td>
                    <td>行動支付</td>
                    <td>
                      <button type="button" className="btn btn-outline-primary">
                        檢視
                      </button>
                    </td>
                    <td>NT$ 120</td>
                  </tr>
                  <tr>
                    <td>2404/04/09</td>
                    <td>2025/04/09 - 2025/05/08 Pro 月繳</td>
                    <td>
                      <span className="material-symbols-outlined align-bottom me-1">
                        credit_card
                      </span>
                      信用卡
                    </td>
                    <td>
                      <button type="button" className="btn btn-outline-primary">
                        檢視
                      </button>
                    </td>
                    <td>NT$ 120</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-center">已無更早的付款紀錄</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
