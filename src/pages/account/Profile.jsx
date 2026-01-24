export default function Profile() {
  return (
    <>
      <h1 className="mb-10">會員資料</h1>

      <section className="mb-10">
        <div className="card">
          <div className="card-body px-8 py-10">
            <div className="row">
              <div className="col-5">
                <div className="d-flex flex-column align-items-center">
                  <div className="profile-image mb-4">
                    <img src="user.png" alt="profile-image" />
                  </div>
                  <div className="d-flex gap-2 mb-10">
                    <button type="button" className="btn btn-primary">
                      變更
                    </button>
                    <button type="button" className="btn btn-outline-primary">
                      移除
                    </button>
                  </div>
                  <div className="flex-grow-0">
                    <h2 className="fs-l mb-2">用戶名稱</h2>
                    <div className="d-flex align-items-center gap-3">
                      <p>User Name</p>
                      <button
                        type="button"
                        className="btn btn-primary-100 p-1 rounded-circle"
                      >
                        <span className="material-symbols-outlined align-bottom">
                          edit
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-7">
                <div className="mb-6">
                  <div className="d-flex align-items-center gap-2">
                    <h2 className="fs-l mb-2">電子信箱</h2>
                    <span class="fs-xs badge badge-secondary">已驗證</span>
                  </div>
                  <p>exampl23@mail.com</p>
                </div>
                <div className="mb-6">
                  <h2 className="fs-l mb-2">密碼</h2>
                  <div className="d-flex justify-content-between align-items-center">
                    <p>**********</p>
                    <button type="button" className="btn btn-primary">
                      變更
                    </button>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <h2 className="fs-l">手機</h2>
                    <a
                      href="#"
                      className="fs-xs link-primary text-decoration-underline link-offset-1"
                    >
                      立即驗證
                    </a>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <p>0912345678</p>
                    <button
                      type="button"
                      className="btn btn-primary-100 p-1 rounded-circle"
                    >
                      <span className="material-symbols-outlined align-bottom">
                        edit
                      </span>
                    </button>
                  </div>
                </div>
                <div>
                  <h2 className="fs-l mb-2">帳單地址</h2>
                  <div className="d-flex align-items-center gap-3">
                    <p>台北市圈圈區叉叉路 100號</p>
                    <button
                      type="button"
                      className="btn btn-primary-100 p-1 rounded-circle"
                    >
                      <span className="material-symbols-outlined align-bottom">
                        edit
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
