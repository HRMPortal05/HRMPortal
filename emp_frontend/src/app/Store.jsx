import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { UserAuthApi } from "../services/UserAuthApi";
import { LeaveManagement } from "../services/LeaveManagement";
import { SalarySlip } from "..//services/SalarySlip";
import { Employee } from "../services/Employee";

export const store = configureStore({
  reducer: {
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    [LeaveManagement.reducerPath]: LeaveManagement.reducer,
    [SalarySlip.reducerPath]: SalarySlip.reducer,
    [Employee.reducerPath]: Employee.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      UserAuthApi.middleware,
      LeaveManagement.middleware,
      SalarySlip.middleware,
      Employee.middleware
    ),
});

setupListeners(store.dispatch);
