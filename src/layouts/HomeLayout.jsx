import { Outlet } from "react-router-dom";
import BaseHeader from "@/layouts/base/BaseHeader";

export default function HomeLayout() {
  return (
    <>
      <BaseHeader />
      <div style={{ height: "1000px" }}>
        <Outlet />
      </div>
      <h2>footer</h2>
    </>
  );
}
