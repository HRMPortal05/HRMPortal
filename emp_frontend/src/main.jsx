import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./app/Store.jsx";
import Login from "./components/Auth/Login.jsx";
import ForgotPassword from "./components/Auth/ForgotPassword.jsx";
import ResetPassword from "./components/Auth/ResetPassword.jsx";
import { SnackbarProvider } from "notistack";
import EmailSent from "./components/Auth/EmailSent.jsx";
import ApplyForLeave from "./components/ApplyForLeave/ApplyForLeave.jsx";
import ChangePassword from "./components/Auth/ChangePassword.jsx";
import DashboardHeader from "./components/DashBoardHeader.jsx";
import SalarySlip from "./components/SalarySlip/SalarySlip.jsx";
import SalarySlipView from "./components/SalarySlip/SalarySlipView.jsx";
import FOFPage from "./components/Auth/FOFPage.jsx";
import GoToLogin from "./components/Auth/GoToLogin.jsx";
import Dashboard from "./components/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <DashboardHeader />,
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "applyForLeave",
        element: (
          <SnackbarProvider maxSnack={3}>
            <ApplyForLeave />
          </SnackbarProvider>
        ),
      },
      {
        path: "salarySlip",
        element: (
          <SnackbarProvider maxSnack={3}>
            <SalarySlip />
          </SnackbarProvider>
        ),
      },
      {
        path: "salarySlipView",
        element: (
          <SnackbarProvider maxSnack={3}>
            <SalarySlipView />
          </SnackbarProvider>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <SnackbarProvider maxSnack={3}>
        <Login />
      </SnackbarProvider>
    ),
  },
  {
    path: "/forgotPassword",
    element: (
      <SnackbarProvider maxSnack={3}>
        <ForgotPassword />
      </SnackbarProvider>
    ),
  },
  {
    path: "/changePassword",
    element: (
      <SnackbarProvider maxSnack={3}>
        <ChangePassword />
      </SnackbarProvider>
    ),
  },
  {
    path: "/resetPassword/:id/:token",
    element: (
      <SnackbarProvider maxSnack={3}>
        <ResetPassword />
      </SnackbarProvider>
    ),
  },
  {
    path: "/emailSent",
    element: <EmailSent />,
  },
  {
    path: "/passwordChanged",
    element: <GoToLogin />,
  },
  {
    path: "*",
    element: <FOFPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
