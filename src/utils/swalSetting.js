import Swal from "sweetalert2";

const defaultToastOptions = {
  toast: true,
  width: "18rem",
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  customClass: {
    popup: "rounded-2 p-2 fw-normal tracking-2 swal-toast swal-toast-slide",
  },
  showClass: { popup: "swal-toast-slide-in" },
  hideClass: { popup: "swal-toast-slide-out" },
};

// 樣式集
const toastClasses = {
  success: "bg-secondary-0 text-secondary",
  error: "bg-primary-0 text-primary",
};

/* 顯示 Swal toast
  - title: 顯示文字
  - variant: 樣式（success, error）
  - overrides: 覆寫預設選項（如 timer、width）
*/
export function showSwalToast({ title, variant = "success", overrides = {} }) {
  const popupClass = [
    defaultToastOptions.customClass.popup,
    toastClasses[variant],
  ].join(" ");

  return Swal.fire({
    ...defaultToastOptions,
    title,
    customClass: { popup: popupClass },
    ...overrides,
  });
}
