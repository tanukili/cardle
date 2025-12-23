import { Outlet, Link } from "react-router-dom";

export default function BookshelfIndex() {
  return (
    <>
      <h1>6-1. 我的書單</h1>
      <ul>
        <li>
          <Link to="/user/bookshelf">日曆</Link>
        </li>
        <li>
          <Link to="/user/bookshelf/pomodoro">番茄鐘</Link>
        </li>
        <li>
          <Link to="/user/bookshelf/topics">學習主題</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
}
