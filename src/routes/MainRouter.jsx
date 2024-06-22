import { createBrowserRouter } from "react-router-dom";
import MainApp from "../layouts/MainApp/MainApp";
import Appointment from "../pages/Appointment";
import Cart from "../pages/Cart";
import AddBanner from "../pages/Dashboard/AdminDashboard/AddBanner";
import AddTest from "../pages/Dashboard/AdminDashboard/AddTest";
import AllBanner from "../pages/Dashboard/AdminDashboard/AllBanner";
import AllTests from "../pages/Dashboard/AdminDashboard/AllTests";
import AllUsers from "../pages/Dashboard/AdminDashboard/AllUsers";
import Reservations from "../pages/Dashboard/AdminDashboard/Reservations";
import Dashboard from "../pages/Dashboard/Dashboard";
import UserAppointments from "../pages/Dashboard/UserDashboard/UserAppointments";
import UserProfile from "../pages/Dashboard/UserDashboard/UserProfile";
import UserTestResult from "../pages/Dashboard/UserDashboard/UserTestResult";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUP from "../pages/SignUP";
import TestDetails from "../pages/TestDetails";
import UpdateProfile from "../pages/UpdateProfile";
import AdminRoute from "./AdminRoute";
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
      {
        path: "/allTest",
        element: <Appointment />,
      },
      {
        path: "/testDetails/:id",
        element: (
          <PrivateRoute>
            <TestDetails />
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
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addTest",
        element: (
          <AdminRoute>
            <AddTest />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allTests",
        element: (
          <AdminRoute>
            <AllTests />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addBanner",
        element: (
          <AdminRoute>
            <AddBanner />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allBanner",
        element: (
          <AdminRoute>
            <AllBanner />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reservations",
        element: (
          <AdminRoute>
            <Reservations />
          </AdminRoute>
        ),
      },

      // USER Related Route
      {
        path: "/dashboard/userProfile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/cart",
        element: (
          <PrivateRoute>
            <Cart />
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
