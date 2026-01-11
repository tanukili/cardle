import { Link, NavLink, Outlet } from "react-router-dom";
import UserHeader from "../user/UserHeader";

export default function AccountLayout() {
  return (
    <>
      <UserHeader />
      <div className="container py-20">
        <div className="d-flex gap-20">
          <div className="w-25">
            <Link to="/user" className="link-primary mb-4">
              <span className="material-symbols-outlined align-bottom me-1">
                arrow_left_alt
              </span>
              返回 Cardle
            </Link>
            <div className="list-group">
              <Link
                to="/account"
                className="list-group-item list-group-item-action"
              >
                會員總覽
              </Link>
              <Link
                to="/account/profile"
                className="list-group-item list-group-item-action"
              >
                會員資料
              </Link>
              <Link
                to="/account/plan"
                className="list-group-item list-group-item-action"
              >
                個人方案
              </Link>
            </div>
          </div>
          <div className="w-100">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
