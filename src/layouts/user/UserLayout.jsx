import { Outlet } from "react-router-dom";
import UserHeader from "@/layouts/user/UserHeader";

export default function userLayout() {
  return (
    <>
      <UserHeader />
      <Outlet />
    </>
  );
}
