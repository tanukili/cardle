import { Outlet } from "react-router-dom";

export default function userLayout() {
  return (
    <>
      <h1>user header</h1>
      <Outlet />
    </>
  );
}
