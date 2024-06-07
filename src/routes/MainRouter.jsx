import { createBrowserRouter } from "react-router-dom";
import MainApp from "../layouts/MainApp/MainApp";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUP from "../pages/SignUP";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainApp />,
    errorElement: <p>Error page</p>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
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
]);

export default router;
