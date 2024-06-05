import { createBrowserRouter } from "react-router-dom";
import MainApp from "../layouts/MainApp/MainApp";
import SignUP from "../pages/SignUP";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainApp />,
    errorElement: <p>Error page</p>,
    children: [{}],
  },
  {
    path: "/signUP",
    errorElement: <p>Error Page</p>,
    element: <SignUP />,
  },
]);

export default router;
