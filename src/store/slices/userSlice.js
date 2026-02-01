import { createSlice } from "@reduxjs/toolkit";

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
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
