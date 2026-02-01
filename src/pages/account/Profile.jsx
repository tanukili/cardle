import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DEFAULT_AVATAR_URL =
  "https://res.cloudinary.com/dt24k06gm/image/upload/v1768755900/uncd8bdsxzci1yj3aeho.png";

export default function Profile() {
  const userInfo = useSelector((state) => state.user.userInfo);

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
            <h1 className="fs-2xl fs-md-3xl me-2 me-md-6">會員資料</h1>
          </div>
        </div>

        <section className="mb-10">
          <div className="card border-gray-200">
            <div className="card-body px-6 px-md-8 py-10">
              <div className="row">
                <div className="col-md-5">
                  <div className="d-flex flex-column align-items-center mb-10 mb-md-0">
                    <div className="profile-image mb-4">
                      <img
                        src={userInfo.avatarImage || DEFAULT_AVATAR_URL}
                        alt="profile-image"
                      />
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
                        <p>{userInfo.username}</p>
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
                <div className="col-md-7">
                  <div className="mb-6">
                    <div className="d-flex align-items-center gap-2">
                      <h2 className="fs-l mb-2">電子信箱</h2>
                      <span className="fs-xs badge badge-secondary">
                        已驗證
                      </span>
                    </div>
                    <p>{userInfo.email}</p>
                  </div>
                  <div className="mb-6">
                    <h2 className="fs-l mb-2">密碼</h2>
                    <div className="d-flex justify-content-between align-items-center">
                      <p>*******</p>
                      <button type="button" className="btn btn-primary">
                        變更
                      </button>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <h2 className="fs-l">電話</h2>
                      <a
                        href="#"
                        className="fs-xs link-primary text-decoration-underline link-offset-1"
                      >
                        立即驗證
                      </a>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <p>{userInfo.phone}</p>
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
                      <p>{userInfo.address}</p>
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
      </div>
    </>
  );
}
