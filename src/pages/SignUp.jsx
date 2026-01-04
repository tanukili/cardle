import { Link } from "react-router-dom";
import { Modal } from "bootstrap";

export default function SignUp() {
  return (
    <>
      <main className="d-flex flex-column flex-md-row bg-light">
        {/* 圖片區塊 */}
        <section className="sign-up-impression">
          <img src="impression.png" alt="impression" />
        </section>
        {/* <表單區塊 */}
        <section className="sign-up-content py-10 py-md-16 px-3 px-md-15">
          <div className="container">
            {/* 標題 */}
            <div className="mb-6 mb-md-10">
              <h1 className="fs-3xl fs-md-4xl mb-4">歡迎加入Cardle！</h1>
              <p className="fw-medium">立即註冊，開始建立你的知識地圖。</p>
            </div>
            {/* 表單 */}
            <form className="row mb-6 was-validated">
              <div className="col-xl-6 mb-4">
                <label htmlFor="inputEmail" className="form-label">
                  電子信箱<span className="ms-1 text-primary">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="inputEmail"
                  placeholder="xxxxx@example.com"
                  required
                />
                <div className="invalid-feedback">
                  請輸入有效的電子信箱，未來將用於登入與通知。
                </div>
              </div>
              <div className="col-xl-6 mb-4">
                <label htmlFor="inputName" className="form-label">
                  用戶名稱<span className="ms-1 text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  id="inputName"
                  placeholder="請輸入暱稱"
                  required
                />
                <div className="invalid-feedback">請輸入您的名字或暱稱。</div>
              </div>
              <div className="col-xl-6 mb-4">
                <label htmlFor="inputPassword" className="form-label">
                  密碼<span className="ms-1 text-primary">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password1"
                  id="inputPassword"
                  minLength="6"
                  placeholder="請輸入至少6位數密碼"
                  required
                />
                <div className="invalid-feedback">密碼格式不符合規則。</div>
              </div>
              <div className="col-xl-6 mb-4">
                <label htmlFor="inputPassword2" className="form-label">
                  確認密碼<span className="ms-1 text-primary">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password2"
                  id="inputPassword2"
                  minLength="6"
                  placeholder="再次確認密碼"
                  required
                />
                <div className="invalid-feedback">兩次密碼需相同。</div>
              </div>
              <div className="col-xl-6 mb-4">
                <label htmlFor="inputPhone" className="form-label">
                  電話
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  id="inputPhone"
                  placeholder="請輸入電話號碼"
                />
              </div>
              <div className="col-xl-6 mb-4 align-self-end">
                <div className="d-flex">
                  <div className="align-self-end">
                    <label
                      htmlFor="inputProfile"
                      className="form-label btn btn-outline-primary me-4 mb-0"
                    >
                      上傳頭貼
                    </label>
                    <input
                      type="file"
                      className="form-control d-none"
                      name="profile"
                      id="inputProfile"
                    />
                  </div>
                  <div className="profile-preview">
                    <img src="user.png" alt="profile-preview" />
                  </div>
                </div>
                <div className="invalid-feedback">檔案過大或格式不支援。</div>
              </div>
              <div className="col-12 mb-4">
                <label htmlFor="inputAddress" className="form-label">
                  帳單地址
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  id="inputAddress"
                  placeholder="請輸入帳單地址"
                />
              </div>
              <div className="col-12">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="subscribe"
                    id="checkNewsletter"
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="checkNewsletter">
                    訂閱電子報，收到更多產品資訊
                  </label>
                </div>
              </div>
              <div className="col-12 mb-11 mb-md-15">
                <div className="form-check position-relative">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="agreeTerms"
                    id="checkTerms"
                    required
                  />
                  <label className="form-check-label" htmlFor="checkTerms">
                    我已閱讀並同意
                    <a
                      href="#"
                      className="link-secondary"
                      data-bs-toggle="modal"
                      data-bs-target="#termsModal"
                    >
                      《服務條款與隱私政策》
                    </a>
                  </label>
                  <div className="invalid-feedback position-absolute start-0">
                    請先同意《服務條款與隱私政策》。
                  </div>
                </div>
              </div>
              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-primary py-md-4 w-100"
                  data-bs-toggle="modal"
                  data-bs-target="#registerModal"
                >
                  註冊
                </button>
              </div>
            </form>
            {/* 立即登入 */}
            <p className="fw-medium">
              已經有Cardle帳號了？
              <Link
                to="/login"
                className="text-decoration-underline link-secondary link-offset-1"
              >
                立即登入
              </Link>
            </p>
          </div>
        </section>
      </main>

      {/* Modal - 服務條款 與 隱私權政策 */}
      <div
        className="modal fade"
        id="termsModal"
        tabIndex="-1"
        aria-labelledby="termsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              {/* <h1 className="modal-title fs-3xl" id="exampleModalLabel">Modal title</h1> */}
              <button
                type="button"
                className="btn-close p-2_5"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-12">
                <h2 className="fs-2xl fs-md-3xl mb-6">會員服務條款</h2>
                <ul>
                  <li className="mb-1">
                    感謝您加入本網站會員（以下稱「本服務」）。申請成為會員前，請您詳細閱讀並同意本條款。
                  </li>
                  <li className="mb-1">
                    會員需提供真實、完整且最新的個人資料，並妥善保管帳號與密碼。
                  </li>
                  <li>
                    會員不得利用本服務進行任何非法行為或損害他人權益之行為。若因會員違反法律或本條款造成損害，本網站有權立即終止其帳號並追究法律責任。
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="fs-2xl fs-md-3xl mb-6">個資蒐集與隱私保護</h2>
                <ul>
                  <li className="mb-1">
                    本網站於提供服務過程中，可能會蒐集您的姓名、聯絡方式、交易資料等個人資訊，僅用於會員管理、服務提供與行銷通知，不會在未經同意下洩露予第三方，除非依法律規定或主管機關要求。
                  </li>
                  <li className="mb-1">
                    本網站採取合理安全措施保護您的資料，但無法保證完全免於駭客入侵或其他不可抗力風險。
                  </li>
                  <li>
                    本網站保留隨時修改、暫停或終止本服務之權利，並於網站公告後生效。條款修改後，會員繼續使用本服務，視為已同意更新條款。
                  </li>
                </ul>
              </div>
            </div>
            <div className="modal-footer border-top-0">
              <button
                type="button"
                className="btn btn-primary py-md-4 w-100"
                data-bs-dismiss="modal"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - 註冊 */}
      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <h1
                className="modal-title fs-2xl fs-md-3xl"
                id="exampleModalLabel"
              >
                <span className="material-symbols-outlined fill align-middle text-secondary fs-4xl me-2">
                  check_circle
                </span>
                註冊成功！
              </h1>
              {/* <a href="<%= HERF_BASE %>login.html" className="btn-close p-2_5"></a> */}
              <button
                type="button"
                className="btn-close p-2_5"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <p className="fs-xl fs-md-2xl fw-medium mb-3">
                  歡迎來到 Cardle 卡片盒筆記！
                </p>
                <p className="fs-m">
                  我們已把通知信寄到您的信箱，若未收到，請稍後再查看或檢查垃圾信件匣。
                </p>
              </div>
            </div>
            <div className="modal-footer border-top-0">
              {/* <a
                href="<%= HERF_BASE %>login.html"
                className="btn btn-primary py-md-4 w-100"
              >
                確認
              </a> */}
              <button
                type="button"
                className="btn btn-primary py-md-4 w-100"
                data-bs-dismiss="modal"
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
