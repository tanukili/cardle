import { Outlet, Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>1. 首頁</h1>
      <Link to="/login">立即登入</Link>
    </>
  );
}
