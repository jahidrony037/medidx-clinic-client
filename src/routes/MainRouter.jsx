import { createBrowserRouter } from "react-router-dom";
import MainApp from "../layouts/MainApp/MainApp";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUP from "../pages/SignUP";
import UpdateProfile from "../pages/UpdateProfile";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/signUP",
    errorElement: <p>Error Page</p>,
    element: <SignUP />,
  },
  {
    path: "/login",
    errorElement: <p>Error Page</p>,
    element: <Login />,
  },
  {
    path: "/",
    element: <MainApp />,
    errorElement: <p>Error page</p>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/updateProfile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
