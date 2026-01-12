import { useParams } from "react-router-dom";
export default function Checkout() {
  const { id } = useParams();
  return (
  <div className="container">
    <h1 className="fs-md-5xl fs-4 pb-6 border-bottom mb-6 text-center">方案明細{id}</h1>
    <div className="row justify-content-center">
      <div className="col-md-8 mb-6">
        <div class="card shadow-sm border-0 custom-plan-card p-3">
          <div class="card-body">
            <h2 class="card-title fw-bold border-bottom mb-3">Pro 月繳方案</h2>
            <p class="card-text">訂閱日期：2025 年 08 月 09 日</p>
            <p className="card-text">自動續訂日期：2025 年 09 月 09 日</p>
            <p className="card-text mb-2">費用：NT$120 / 月</p>
            <div class="accordion accordion-flush" id="planDetails">
              <div class="accordion-item">
                <h2 class="accordion-header d-flex flex-column">
                <button class="accordion-button px-0 py-0 fw-bold"  type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                  方案功能與上限說明
                </button>
                <hr className="my-0"/>
                </h2>
              <div id="collapseOne" class="accordion-collapse collapse show">
                <div class="accordion-body px-0 pt-3">
                  <ol class="list-group list-group-numbered list-group-flush small">
                    <li class="list-group-item border-0 px-0 plan-list-item">
                      <strong>無限制建立筆記卡片：</strong>沒有張數限制，靈感再多也能全部記下來，打造屬於你的知識庫。
                    </li>
                    <li class="list-group-item border-0 px-0 plan-list-item">
                      <strong>無限制建立書單：</strong>想追的書、學的主題再多都沒問題，隨心所欲整理你的閱讀計畫。
                    </li>
                    <li class="list-group-item border-0 px-0 plan-list-item">
                      <strong>標籤分類：</strong>支援標籤分類管理，簡單歸納每一筆知識。
                    </li>
                    <li class="list-group-item border-0 px-0 plan-list-item">
                      <strong>視覺化關聯地圖：</strong>將筆記之間的連結一目了然，幫助你建立屬於自己的知識網絡。
                    </li>
                    <li class="list-group-item border-0 px-0 plan-list-item">
                      <strong>進度追蹤與提醒：</strong>一起養成穩定學習習慣！追蹤閱讀進度，還能設定提醒不怕忘記。
                    </li>
                    <li class="list-group-item border-0 px-0 plan-list-item">
                      <strong>隨時取消：</strong>無綁約壓力，可隨時取消訂閱，依照你的學習節奏自由彈性使用。
                    </li>
                  </ol>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-md-6">

    <div class="card border-0 shadow-sm mx-auto p-3">
      <div className="card-body">
        <h3 class="text-center mb-4 fw-bold">請輸入付款資訊</h3>
        <div class="mb-4">
          <label class="form-label fw-bold">付款方式</label>
          <ul class="nav nav-pills border rounded overflow-hidden d-flex" id="paymentTab" role="tablist">
            <li class="nav-item flex-fill text-center w-50" role="presentation">
              <button class="nav-link active w-100 rounded-0 py-2 btn-payment" id="credit-tab" data-bs-toggle="pill" data-bs-target="#pane-credit" type="button" role="tab">信用卡</button>
            </li>
            <li class="nav-item flex-fill text-center w-50" role="presentation">
              <button class="nav-link w-100 rounded-0 py-2 btn-payment" id="newebpay-tab" data-bs-toggle="pill" data-bs-target="#pane-newebpay" type="button" role="tab">藍新 NewebPay</button>
            </li>
          </ul>
        </div>
        <div class="tab-content" id="pills-tabContent">
          <div class="tab-pane show active" id="pane-credit" role="tabpanel">
            <div class="mb-3">
              <label htmlFor="cardUser" class="form-label fw-bold">持卡人姓名</label>
              <input id="cardUser" type="text" class="form-control" placeholder="e.g John Doe"/>
            </div>
            <div class="mb-3">
              <label htmlFor="cardNum" class="form-label fw-bold">信用卡號</label>
              <div class="input-group custom-focus-group">
                <span class="input-group-text bg-gray-0 border-end-0">
                  <i class="bi bi-credit-card"></i>
                </span>
                <input id="cardNum" type="text" class="form-control border-start-0 ps-0" placeholder="1234 1234 1234 1234"/>
              </div>
            </div>
            <div class="row g-2 mb-3">
              <div class="col-6">
                <label htmlFor="EXDate" class="form-label fw-bold">Exp Date</label>
                <input id="EXDate" type="text" class="form-control" placeholder="MM/YY"/>
              </div>
              <div class="col-6">
                <label htmlFor="CVV" class="form-label fw-bold">CVV</label>
                <input id="CVV" type="text" class="form-control" placeholder="e.g 1234"/>
              </div>
            </div>
            <div class="mb-4">
              <div class="form-check form-check-inline small">
                <input class="form-check-input" type="checkbox" id="terms"/>
                <label class="form-check-label" htmlFor="terms">同意服務條款</label>
              </div>
              <div class="form-check form-check-inline small">
                <input class="form-check-input" type="checkbox" id="autoRenew"/>
                <label class="form-check-label" htmlFor="autoRenew">我同意自動續訂</label>
              </div>
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-dark py-3 fw-bold">PAY NOW NT$120</button>
            </div>
          </div>
          <div class="tab-pane" id="pane-newebpay" role="tabpanel">
            <h2>藍新 NewebPay</h2>
            <p class="text-muted small">請點擊下方 Pay Now 按鈕，系統將引導至第三方支付頁面。</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  </div>)
}
