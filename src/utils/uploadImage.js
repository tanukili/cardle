import { cloudinaryClient } from "@/services/cloudinaryClient";
import { showSwalToast } from "./swalSetting";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadImage = async (file) => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file); // 檔案本體
  formData.append("upload_preset", UPLOAD_PRESET); // unsigned preset 必帶
  // console.log(
  //   "axios default auth:",
  //   axios.defaults.headers.common?.Authorization,
  // );

  try {
    const res = await cloudinaryClient.post(url, formData);
    return res.data.secure_url;
  } catch (error) {
    showSwalToast({ title: "圖片上傳失敗，請稍後再試", variant: "error" });
  }
};
