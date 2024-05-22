import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth-slice";
import notificationSlice from "./reducers/notification-slice";
import getbaseUrlReducer from "./reducers/getbaseUrlReducer";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    baseUrl: getbaseUrlReducer.reducer,
  },
});
export default store;
