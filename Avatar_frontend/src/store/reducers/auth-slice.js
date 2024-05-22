import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    refresh: localStorage.getItem("refresh")
      ? localStorage.getItem("refresh")
      : null,
    isLoggedIn: localStorage.getItem("refresh") ? true : false,
  },
  reducers: {
    login(state, action) {
      const { refresh } = action.payload;
      state.refresh = refresh;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.refresh = null;
      localStorage.removeItem("refresh");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
