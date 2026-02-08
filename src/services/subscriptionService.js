import { apiClient } from "./apiClient";

// 取得會員訂單
export const getOrdersByUser = async (userId) => {
  return apiClient.get(`/orders?userId=${userId}`);
};

// 取得訂閱方案
export const getPlans = async () => {
  return apiClient.get(`/plans`);
};

// 取得會員付款方式
export const getPaymentMethodsByUser = async (userId) => {
  return apiClient.get(`/paymentMethods?userId=${userId}`);
};

// 取得會員退費資料
export const getRefundsByUser = async (userId) => {
  return apiClient.get(`/refunds?userId=${userId}`);
};

// paid -> free (到期降級）：停止續訂
export const stopAutoRenew = async (orderId, patchData = {}) => {
  return apiClient.patch(`/orders/${orderId}`, {
    isAutoRenew: false,
    ...patchData,
  });
};

// 升級/變更：讓舊單失效
export const inactivateOrder = async (orderId, patchData = {}) => {
  return apiClient.patch(`/orders/${orderId}`, {
    status: "inactive",
    isAutoRenew: false,
    ...patchData,
  });
};

// 新增一筆 active 訂單 (不改資料結構)
export const createActiveOrder = async (order) => {
  return apiClient.post(`/orders`, order);
};

// 新增退款資料
export const createRefund = async (refund) => {
  return apiClient.post(`/refunds`, refund);
};
