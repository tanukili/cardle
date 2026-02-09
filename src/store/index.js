import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/slices/userSlice";
import subscriptionReducer from "@/store/slices/subscriptionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    subscription: subscriptionReducer,
  },
});
