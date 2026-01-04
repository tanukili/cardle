import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userInfo: { name: "", avatarUrl: "" },
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.userInfo = { name: "", avatarUrl: "" };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
