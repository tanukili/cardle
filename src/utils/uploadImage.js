import { cloudinaryClient } from "@/services/cloudinaryClient";
import { showSwalToast } from "./swalSetting";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * 將圖片上傳至 Cloudinary，並回傳可直接使用的圖片網址 (secure_url)
 *
 * 使用 Cloudinary **unsigned upload preset**，
 * 前端可直接上傳圖片，不需經過後端轉發。
 *
 * @async
 * @function uploadImage
 *
 * @param {File} file
 *   使用者選擇的圖片檔案 (通常來自 <input type="file">)
 *
 * @param {string} [folder="default"]
 *   Cloudinary 中的目標資料夾路徑
 *   - 可使用巢狀路徑 (例如："products/main")
 *   - Cloudinary 會自動建立不存在的資料夾
 *
 * @returns {Promise<string|undefined>}
 *   上傳成功時回傳圖片的 HTTPS 安全網址 (secure_url)
 *   上傳失敗時回傳 undefined，並顯示錯誤提示
 *
 * @example
 * // 上傳使用者頭像
 * const avatarUrl = await uploadImage(file, "avatars");
 *
 * @example
 * // 上傳商品主圖
 * const imageUrl = await uploadImage(file, "products/main");
 */
export const uploadImage = async (file, folder = "default") => {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file); // 檔案本體
  formData.append("upload_preset", UPLOAD_PRESET); // unsigned preset 必帶
  formData.append("folder", folder); // 指定資料夾

  try {
    const res = await cloudinaryClient.post(url, formData);
    return res.data.secure_url;
  } catch (error) {
    showSwalToast({ title: "圖片上傳失敗，請稍後再試", variant: "error" });
  }
};
