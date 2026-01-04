import { Outlet } from "react-router-dom";
import BaseHeader from "@/layouts/base/BaseHeader";

export default function HomeLayout() {
  return (
    <>
      <BaseHeader />
      <div>
        <Outlet />
      </div>
      <h2>footer</h2>
    </>
  );
}
