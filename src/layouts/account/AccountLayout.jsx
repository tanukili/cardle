import { Outlet } from "react-router-dom";

export default function AccountLayout() {
  return (
    <>
      <h1>sidebar</h1>
      <Outlet />
    </>
  );
}
