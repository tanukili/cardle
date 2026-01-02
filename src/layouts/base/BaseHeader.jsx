import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function BaseHeader() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userInfo = useSelector((state) => state.user.userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const offcanvasRef = useRef(null);

  useEffect(() => {
    const el = offcanvasRef.current;
    if (!el) return;

    const bsOffcanvas = bootstrap.Offcanvas.getInstance(el);

    if (bsOffcanvas && el.classList.contains("show")) {
      bsOffcanvas.hide();
    }
  }, [location]);

  // 元件卸載清理遮罩
  useEffect(() => {
    return () => {
      const backdrops = document.querySelectorAll(".offcanvas-backdrop");
      backdrops.forEach((el) => el.remove());
      document.body.style.overflow = "";
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <nav className="header-navbar sticky-top navbar navbar-expand-md bg-gray-0 border-bottom border-primary-100 pe-0">
        <div className="container">
          <Link to="/">
            <h2 className="logo">Cardle</h2>
          </Link>
          {/* 桌面版導覽列 */}
          <div className="offcanvas flex-row align-items-center justify-content-end">
            <ul className="navbar-nav gap-2">
              {isLoggedIn ? (
                <li key="desktop-user">
                  <div className="dropdown">
                    <button
                      className="nav-link py-1 px-4 rounded-2 d-flex align-items-center dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userInfo.avatarUrl && (
                        <img
                          className="header-avatar rounded-circle"
                          src={userInfo.avatarUrl}
                          alt="個人頭像"
                        />
                      )}
                      <span className="mx-2">Jennie</span>
                      <span className="material-symbols-outlined">
                        keyboard_arrow_down
                      </span>
                    </button>
                    <ul className="dropdown-shadow dropdown-menu border-primary-400 bg-gray-0">
                      <li>
                        <Link
                          className="dropdown-item rounded-2 mb-2"
                          to="/user"
                        >
                          筆記儀表板
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item rounded-2 mb-2"
                          to="/user/bookshelf"
                        >
                          我的書單
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item rounded-2 mb-2"
                          to="/account"
                        >
                          會員中心
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item rounded-2"
                          type="button"
                          onClick={handleLogout}
                        >
                          登出
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              ) : (
                <Fragment key="desktop-guest">
                  <li className="nav-item">
                    <Link
                      className="nav-link rounded-2 py-2 px-4 active"
                      aria-current="page"
                      to="/"
                    >
                      首頁
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link rounded-2 py-2 px-4"
                      to="/features"
                    >
                      商品介紹
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link rounded-2 py-2 px-4"
                      to="/subscription"
                    >
                      訂閱方案
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-outline-primary" to="/login">
                      登入
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" to="/sign-up">
                      免費註冊
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
          {/* offcanvas 按鈕 */}
          {isLoggedIn ? (
            <button
              className="navbar-toggler p-0 border-0 rounded-circle focus-ring ms-4"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mainNavbar"
              aria-controls="userNavbar"
              aria-label="Toggle navigation"
              key="btn-user"
            >
              <img
                className="header-avatar rounded-circle"
                src={userInfo.avatarUrl}
                alt="個人頭像"
              />
            </button>
          ) : (
            <button
              className="navbar-toggler border-0 ms-auto"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mainNavbar"
              aria-controls="headerNavbar"
              aria-label="Toggle navigation"
              key="btn-guest"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          )}
        </div>
      </nav>
      {/* mobile offcanvas */}
      <div
        className="header-offcanvas offcanvas offcanvas-end bg-gray-0 d-md-none"
        tabIndex="-1"
        id="mainNavbar"
        data-bs-scroll="true"
        data-bs-backdrop="true"
        aria-labelledby="userNavbarLabel"
        ref={offcanvasRef}
      >
        <div className="offcanvas-body p-2 border border-primary-400">
          <ul className="navbar-nav me-auto mb-6">
            {isLoggedIn ? (
              <Fragment key="offcanvas-user">
                <li className="nav-item">
                  <Link
                    className="nav-link text-primary rounded-2 py-3 px-4 mb-2"
                    to="/user"
                  >
                    筆記儀表板
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-primary rounded-2 py-3 px-4 mb-2"
                    to="/user/bookshelf"
                  >
                    我的書單
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-primary rounded-2 py-3 px-4 mb-2"
                    to="/account"
                  >
                    會員中心
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link text-primary rounded-2 py-3 px-4 w-100 text-start"
                    type="button"
                    onClick={handleLogout}
                  >
                    登出
                  </button>
                </li>
              </Fragment>
            ) : (
              <Fragment key="offcanvas-guest">
                <li className="nav-item">
                  <Link
                    className="nav-link rounded-2 py-3 px-4 active"
                    aria-current="page"
                    to="/"
                  >
                    首頁
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link rounded-2 py-3 px-4" to="/features">
                    商品介紹
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link rounded-2 py-3 px-4"
                    to="/subscription"
                  >
                    訂閱方案
                  </Link>
                </li>
              </Fragment>
            )}
          </ul>
          {isLoggedIn || (
            <>
              <span className="border-bottom border-gray-200 mb-6 mx-0_5 d-block"></span>
              <div className="d-flex flex-column">
                <Link
                  className="btn btn-outline-primary text-start py-3 mb-2"
                  to="/login"
                >
                  登入
                </Link>
                <Link className="btn btn-primary text-start py-3" to="/sign-up">
                  免費註冊
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
