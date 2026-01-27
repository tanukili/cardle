import { Link, NavLink, Outlet } from "react-router-dom";
import UserHeader from "../user/UserHeader";

export default function AccountLayout() {
  return (
    <>
      <UserHeader />
      <div className="overflow-x-hidden">
        <div className="container">
          <div className="account-shell d-flex gap-6">
            <aside className="account-aside border-end border-gray-200 flex-shrink-0 px-4 px-xl-6 py-6 d-none d-xl-block">
              <ul className="nav nav-pills flex-column gap-4 text-center">
                <li className="nav-item">
                  <NavLink className="nav-link py-3" to="/account" end>
                    會員總覽
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link py-3" to="/account/profile" end>
                    會員資料
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link py-3" to="/account/plan" end>
                    個人方案
                  </NavLink>
                </li>
              </ul>
            </aside>
            <div className="account-main">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
