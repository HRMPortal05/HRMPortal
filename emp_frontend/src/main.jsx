import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./app/Store.jsx";
import { SnackbarProvider } from "notistack";
import Login from "./components/Auth/Login.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import ResetPassword from "./components/Auth/ResetPassword.jsx";
import EmailSent from "./components/Auth/EmailSent.jsx";
import ApplyForLeave from "./components/ApplyForLeave/ApplyForLeave.jsx";
import ChangePassword from "./components/Auth/ChangePassword.jsx";
import DashboardHeader from "./components/Dashboard/DashBoardHeader.jsx";
import SalarySlip from "./components/SalarySlip/SalarySlip.jsx";
import SalarySlipView from "./components/SalarySlip/SalarySlipView.jsx";
import FOFPage from "./components/Auth/FOFPage.jsx";
import GoToLogin from "./components/Auth/GoToLogin.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Calendar from "./components/Calender/Calender.jsx";
import NoticeList from "./components/Notice/NoticeList.jsx";
import Holiday from "./components/Holiday/Hoilday.jsx";
import Library from "./components/Library/Library.jsx";
import VerifyEmail from "./components/Auth/VerifyEmail.jsx";
import EmployeeDetails from "./components/EmployeeDetail/EmployeeDetails.jsx";
import Attendance from "./components/Attendance/Attendance.jsx";

const withSnackbar = (Component) => (
  <SnackbarProvider maxSnack={3}>
    <Component />
  </SnackbarProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withSnackbar(App),
    children: [
      {
        path: "",
        element: withSnackbar(DashboardHeader),
        children: [
          {
            path: "",
            element: withSnackbar(Dashboard),
          },
        ],
      },
      {
        path: "applyForLeave",
        element: withSnackbar(ApplyForLeave),
      },
      {
        path: "library",
        element: withSnackbar(Library),
      },
      {
        path: "holiday",
        element: withSnackbar(Holiday),
      },
      {
        path: "notice",
        element: withSnackbar(NoticeList),
      },
      {
        path: "salarySlip",
        element: withSnackbar(SalarySlip),
      },
      {
        path: "salarySlipView",
        element: withSnackbar(SalarySlipView),
      },
      {
        path: "employeeDetail",
        element: withSnackbar(EmployeeDetails),
      },
      {
        path: "calendar",
        element: withSnackbar(Calendar),
      },
      {
        path: "attendance",
        element: withSnackbar(Attendance),
      },
    ],
  },
  {
    path: "/login",
    element: withSnackbar(Login),
  },
  {
    path: "/verifyEmail/:uid/:token",
    element: withSnackbar(VerifyEmail),
  },
  {
    path: "/forgotPassword",
    element: withSnackbar(ForgotPassword),
  },
  {
    path: "/changePassword",
    element: withSnackbar(ChangePassword),
  },
  {
    path: "/resetPassword/:id/:token",
    element: withSnackbar(ResetPassword),
  },
  {
    path: "/emailSent",
    element: withSnackbar(EmailSent),
  },
  {
    path: "/passwordChanged",
    element: withSnackbar(GoToLogin),
  },
  {
    path: "*",
    element: withSnackbar(FOFPage),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
