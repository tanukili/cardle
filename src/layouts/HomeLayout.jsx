import { Outlet } from "react-router-dom";
export default function HomeLayout() {
  return (
    <>
      <h1>header</h1>
      <Outlet />
      <h2>footer</h2>
    </>
  );
}
