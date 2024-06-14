import { createBrowserRouter } from "react-router-dom";
import MainApp from "../layouts/MainApp/MainApp";
import AddTest from "../pages/Dashboard/AdminDashboard/AddTest";
import AllUsers from "../pages/Dashboard/AdminDashboard/AllUsers";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserAppointments from "../pages/Dashboard/UserDashboard/UserAppointments";
import UserProfile from "../pages/Dashboard/UserDashboard/UserProfile";
import UserTestResult from "../pages/Dashboard/UserDashboard/UserTestResult";
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
        path: "/updateProfile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      //admin related route
      {
        path: "/dashboard/allUsers",
        element: <AllUsers />,
      },
      {
        path: "/dashboard/addTest",
        element: <AddTest />,
      },
      {
        path: "/dashboard/userProfile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/userAppointments",
        element: (
          <PrivateRoute>
            <UserAppointments />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/testResult",
        element: (
          <PrivateRoute>
            <UserTestResult />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
