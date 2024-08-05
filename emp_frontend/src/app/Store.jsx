import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserAuthApi } from "../services/UserAuthApi";
import { LeaveManagement } from "../services/LeaveManagement";

export const store = configureStore({
  reducer: {
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    [LeaveManagement.reducerPath]: LeaveManagement.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      UserAuthApi.middleware,
      LeaveManagement.middleware
    ),
});

setupListeners(store.dispatch);
