import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Offcanvas } from "bootstrap";

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

    const bsOffcanvas = Offcanvas.getInstance(el);

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
                    <span className="mx-2">{userInfo.name}</span>
                    <span className="material-symbols-outlined">
                      keyboard_arrow_down
                    </span>
                  </button>
                  <ul
                    className="dropdown-shadow dropdown-menu border-primary-400 bg-gray-0"
                    style={{ height: "calc(100vh - 72px)" }}
                  >
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
                        to="/user/card-boxes"
                      >
                        卡片盒一覽
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item rounded-2 mb-2"
                        to="/user/boards"
                      >
                        白板一覽
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item rounded-2 mb-2"
                        to="/user/articles"
                      >
                        草稿與文章
                      </Link>
                    </li>
                    <span className="border-bottom border-gray-200 mb-2 d-block"></span>

                    <li>
                      <Link className="dropdown-item rounded-2 mb-2" to="/user">
                        個人首頁
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
                      <Link
                        className="dropdown-item rounded-2 mb-2"
                        to="/account/plan/upgrade"
                      >
                        升級方案
                      </Link>
                    </li>
                    <span className="border-bottom border-gray-200 mt-auto mb-2 d-block"></span>
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
          <ul className="navbar-nav h-100">
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
                to="/user/card-boxes"
              >
                卡片盒一覽
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-primary rounded-2 py-3 px-4 mb-2"
                to="/user/boards"
              >
                白板一覽
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link text-primary rounded-2 py-3 px-4 mb-2"
                to="/user/articles"
              >
                草稿與文章
              </Link>
            </li>
            <span className="border-bottom border-gray-200 mb-2 mx-0_5 d-block"></span>
            <li className="nav-item">
              <Link
                className="nav-link text-primary rounded-2 py-3 px-4 mb-2"
                to="/user"
              >
                個人首頁
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
              <Link
                className="nav-link text-primary rounded-2 py-3 px-4 mb-2"
                to="/account/plan/upgrade"
              >
                升級方案
              </Link>
            </li>
            <span className="border-bottom border-gray-200 mt-auto mb-2 mx-0_5 d-block"></span>
            <li className="nav-item">
              <button
                className="nav-link text-primary rounded-2 py-3 px-4 w-100 text-start"
                type="button"
                onClick={handleLogout}
              >
                登出
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
