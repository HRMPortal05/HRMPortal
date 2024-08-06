import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { store } from "./app/Store.jsx";
import Login from "./components/Login.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import { SnackbarProvider } from "notistack";
import EmailSent from "./components/EmailSent.jsx";
import ApplyForLeave from "./components/ApplyForLeave.jsx";
import ChangePassword from "./components/ChangePassword.jsx";
import DashboardHeader from "./components/DashBoardHeader.jsx";
import DashboardBox from "./components/DashboardBox.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashboardHeader />,
        children: [
          {
            path: "/",
            element: <DashboardBox />,
          },
        ],
      },
      {
        path: "/applyForLeave",
        element: (
          <SnackbarProvider maxSnack={3}>
            <ApplyForLeave />
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
