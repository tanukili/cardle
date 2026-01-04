import { Outlet } from "react-router-dom";
import BaseFooter from "@/layouts/base/BaseFooter";
import BaseHeader from "@/layouts/base/BaseHeader";

export default function HomeLayout() {
  return (
    <>
      <BaseHeader />
      <Outlet />
      <BaseFooter />
    </>
  );
}
