import { redirect } from "react-router-dom";
import { showSwalToast } from "@/utils/swalSetting";

export const protectedLoader = () => async () => {
  const userToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userToken="))
    ?.split("=")[1];

  if (!userToken) {
    showSwalToast({ title: "您尚未登入", variant: "error" });
    return redirect("/login");
  }

  return null;
};
