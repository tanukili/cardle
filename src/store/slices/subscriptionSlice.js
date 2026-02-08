import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../services/apiClient";
import {
  getOrdersByUser,
  getPaymentMethodsByUser,
  getPlans,
  getRefundsByUser,
  createActiveOrder,
  createRefund,
  inactivateOrder,
  stopAutoRenew,
} from "../../services/subscriptionService";

const nowSec = () => Math.floor(Date.now() / 1000);
const addDaysFromNowSec = (days) => nowSec() + days * 24 * 60 * 60;
const genOrderId = () => `ord-${Date.now()}`;
const genRefundId = () => `ref-${Date.now()}`;

// 取得 activeOrder
const pickActiveOrder = (orders) => {
  if (!Array.isArray(orders) || orders.length === 0) return null;

  const now = Math.floor(Date.now() / 1000);

  const candidates = orders.filter(
    (order) =>
      order.status === "active" && Number(order.nextBillingDate) >= now,
  );

  if (candidates.length === 0) return null;

  candidates.sort(
    (a, b) => Number(b.nextBillingDate) - Number(a.nextBillingDate),
  );

  return candidates[0];
};

// 計算退費 (依剩餘時間比例退費)
const calcProratedRefund = (order, now) => {
  if (!order) return 0;

  const start = Number(order.subscribeDate);
  const end = Number(order.nextBillingDate);
  const price = Number(order.price);

  if (!start || !end || !price) return 0;

  const total = end - start;
  const remaining = end - now;

  if (total <= 0) return 0;
  if (remaining <= 0) return 0;

  const ratio = remaining / total;
  const refund = Math.round(price * ratio);

  return refund < 0 ? 0 : refund;
};

// 取得會員訂閱資料
export const getUserSubscription = createAsyncThunk(
  "subscription/getUserSubscription",
  async (_, thunkAPI) => {
    try {
      // 取得 userId
      const state = thunkAPI.getState();
      const userId = state.user.userInfo.id;

      if (!userId) {
        return thunkAPI.rejectWithValue("使用者不存在");
      }

      const [orders, plans, paymentMethods] = await Promise.all([
        getOrdersByUser(userId),
        getPlans(),
        getPaymentMethodsByUser(userId),
        // getRefundsByUser(userId),
      ]);

      // 目前的有效訂閱 (orders)
      const activeOrder = pickActiveOrder(orders);

      // 會員訂閱方案 (plans)
      const plan = activeOrder
        ? plans.find((p) => p.id === activeOrder.planId) || null
        : null;

      // 付款方式 (payment methods)
      const paymentMethod = activeOrder
        ? paymentMethods.find((pm) => pm.id === activeOrder.paymentMethodId) ||
          null
        : null;

      // 歷史訂單：join plan + paymentMethod
      const historyOrders = orders
        .sort((a, b) => Number(b.subscribeDate) - Number(a.subscribeDate))
        .map((order) => ({
          ...order,
          plan: plans.find((p) => p.id === order.planId) || null,
          paymentMethod:
            paymentMethods.find((pm) => pm.id === order.paymentMethodId) ||
            null,
        }));

      // console.log("results: ", activeOrder, plan, paymentMethod, historyOrders);

      return { activeOrder, plan, paymentMethod, historyOrders };
    } catch (error) {
      return thunkAPI.rejectWithValue("無法取得會員訂閱相關資料，請再試一次");
    }
  },
);

// Paid -> Free 停止續訂
export const switchPaidToFree = createAsyncThunk(
  "subscription/paidToFree",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const activeOrder = state.subscription.activeOrder;

      if (!activeOrder)
        return thunkAPI.rejectWithValue("目前沒有可變更的有效訂單");

      await stopAutoRenew(activeOrder.id);
      thunkAPI.dispatch(getUserSubscription());

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue("訂閱變更失敗");
    }
  },
);

// 年 -> 月
export const switchYearToMonth = createAsyncThunk(
  "subscription/switchYearToMonth",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = state.user.userInfo.id;
      const { activeOrder, paymentMethod } = state.subscription;

      if (!userId) return thunkAPI.rejectWithValue("使用者不存在");
      if (!activeOrder)
        return thunkAPI.rejectWithValue("目前沒有可變更的有效訂單");

      const refundAmount = calcProratedRefund(activeOrder, nowSec());

      // 取消舊訂單並新增退費資料
      await inactivateOrder(activeOrder.id, {
        refundDetail: {
          amount: refundAmount,
          refundDate: nowSec(),
          reason: "year_to_month_change",
        },
      });

      // 新增月繳訂單
      const newOrderId = genOrderId();
      await createActiveOrder({
        id: newOrderId,
        planId: "plan_pro_month",
        userId,
        price: 120,
        subscribeDate: nowSec(),
        nextBillingDate: addDaysFromNowSec(30),
        isAutoRenew: true,
        agreedToTerms: true,
        status: "active",
        paymentMethodId: paymentMethod?.id || activeOrder.paymentMethodId,
      });

      // 新增退費資料
      // if (refundAmount > 0) {
      //   await createRefund({
      //     id: genRefundId(),
      //     userId,
      //     fromOrderId: activeOrder.id,
      //     toOrderId: newOrderId,
      //     amount: refundAmount,
      //     currency: "TWD",
      //     reason: "year_to_month_change",
      //     createdAt: nowSec(),
      //   });
      // }

      thunkAPI.dispatch(getUserSubscription());

      return { refundAmount };
    } catch (error) {
      return thunkAPI.rejectWithValue("訂閱變更失敗");
    }
  },
);

// 月 -> 年
export const upgradeMonthToYear = createAsyncThunk(
  "subscription/upgradeMonthToYear",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const userId = state.user.userInfo.id;
      const { activeOrder, paymentMethod } = state.subscription;

      if (!userId) return thunkAPI.rejectWithValue("使用者不存在");
      if (!activeOrder)
        return thunkAPI.rejectWithValue("目前沒有可變更的有效訂單");

      const refundAmount = calcProratedRefund(activeOrder, nowSec());

      // 取消舊訂單
      await inactivateOrder(activeOrder.id, {
        refundDetail: {
          amount: refundAmount,
          refundDate: nowSec(),
          reason: "month_to_year_upgrade",
        },
      });

      // 新增年繳訂單
      const newOrderId = genOrderId();
      await createActiveOrder({
        id: newOrderId,
        planId: "plan_pro_year",
        userId,
        price: 1200,
        subscribeDate: nowSec(),
        nextBillingDate: addDaysFromNowSec(365),
        isAutoRenew: true,
        agreedToTerms: true,
        status: "active",
        paymentMethodId: paymentMethod?.id || activeOrder.paymentMethodId,
      });

      // 新增退費資料
      // if (refundAmount > 0) {
      //   await createRefund({
      //     id: genRefundId(),
      //     userId,
      //     fromOrderId: activeOrder.id,
      //     toOrderId: newOrderId,
      //     amount: refundAmount,
      //     currency: "TWD",
      //     reason: "month_to_year_upgrade",
      //     createdAt: nowSec(),
      //   });
      // }

      thunkAPI.dispatch(getUserSubscription());

      return { refundAmount };
    } catch (error) {
      return thunkAPI.rejectWithValue("訂閱變更失敗");
    }
  },
);

const initialState = {
  activeOrder: null,
  plan: null,
  paymentMethod: null,
  historyOrders: [],
  // refunds: [],
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 取得會員訂閱資料 getUserSubscription
      .addCase(getUserSubscription.fulfilled, (state, action) => {
        state.activeOrder = action.payload.activeOrder;
        state.plan = action.payload.plan;
        state.paymentMethod = action.payload.paymentMethod;
        state.historyOrders = action.payload.historyOrders;
        // state.refunds = action.payload.refunds;
      });
  },
});

export default subscriptionSlice.reducer;
