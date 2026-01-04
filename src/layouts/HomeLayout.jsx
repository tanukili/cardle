import { Outlet } from "react-router-dom";
import BaseFooter from "./base/BaseFooter";

export default function HomeLayout() {
  return (
    <>
      <h1>header</h1>
      <Outlet />
      <BaseFooter />
    </>
  );
}
