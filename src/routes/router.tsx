import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { ErrorPage } from "../pages/ErrorPage";
import { HomePage } from "../pages/Home";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
    ],
  },
]);
