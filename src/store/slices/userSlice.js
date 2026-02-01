import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const selectActiveOrder = (historyOrders, now) => {
  if (!Array.isArray(historyOrders) || historyOrders.length === 0) return null;

  const candidates = historyOrders.filter(
    (order) =>
      order.status === "active" && Number(order.nextBillingDate) >= now,
  );

  if (candidates.length === 0) return null;

  return candidates[0];
};

export const getUserSubscription = createAsyncThunk(
  "user/getUserSubscription",
  async (_, thunkAPI) => {
    try {
      // 取得 userId
      const state = thunkAPI.getState();
      const userId = state.user.userInfo.id;

      if (!userId) {
        return thunkAPI.rejectWithValue("使用者不存在");
      }

      // 取得會員訂閱紀錄及付款方式
      const orderRecordRes = await axios.get(
        `${BASE_URL}orders?userId=${userId}&_expand=plan&_expand=paymentMethod&_sort=subscribeDate&_order=desc`,
      );
      const historyOrders = orderRecordRes.data ?? [];
      console.log(historyOrders);

      // 取得目前有效訂閱 (orders)
      const now = Math.floor(Date.now() / 1000);
      const activeOrder = selectActiveOrder(historyOrders, now);
      console.log(activeOrder);

      // 取得會員訂閱方案 (plans)
      const plan = activeOrder?.plan ?? null;
      console.log(plan);

      // 取得付款方式 (payment methods)
      const paymentMethod = activeOrder?.paymentMethod ?? null;
      console.log(paymentMethod);

      return { historyOrders, activeOrder, plan, paymentMethod };
    } catch (error) {
      return thunkAPI.rejectWithValue("無法取得會員訂閱相關資料，請再試一次");
    }
  },
);

export const loadProfile = createAsyncThunk(
  "user/loadProfile",
  async ({ email, password }, thunkAPI) => {
    try {
      // 登入
      const loginRes = await axios.post(`${BASE_URL}login`, {
        email,
        password,
      });
      const { accessToken, user } = loginRes.data;
      console.log(accessToken, user);

      return {
        user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("無法取得會員資料，請再試一次");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userInfo: {
      id: "",
      username: "",
      email: "",
      avatarUrl: "",
      phone: "",
      address: "",
      newsletterSubscribed: false,
    },
    historyOrders: [],
    activeOrder: null,
    plan: null,
    paymentMethod: null,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.userInfo = {
        id: "",
        username: "",
        email: "",
        avatarUrl: "",
        phone: "",
        address: "",
        newsletterSubscribed: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // loadProfile (測試用，之後記得刪)
      .addCase(loadProfile.pending, (state) => {
        state.error = null;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.userInfo = action.payload.user;
      })
      .addCase(loadProfile.rejected, (state, action) => {
        state.error = action.payload;
      })

      // getUserSubscription
      .addCase(getUserSubscription.pending, (state) => {
        state.error = null;
      })
      .addCase(getUserSubscription.fulfilled, (state, action) => {
        state.historyOrders = action.payload.historyOrders;
        state.activeOrder = action.payload.activeOrder;
        state.plan = action.payload.plan;
        state.paymentMethod = action.payload.paymentMethod;
        state.error = null;
      })
      .addCase(getUserSubscription.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
