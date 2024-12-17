import { RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import Wellcome from "../pages/Wellcome/Wellcome";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Login from "../pages/LoginPage/Login";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Wellcome />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  }
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
