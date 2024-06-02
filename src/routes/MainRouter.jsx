import { createBrowserRouter } from "react-router-dom";
import MainApp from "../layouts/MainApp/MainApp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainApp />,
    children: [{}],
  },
]);

export default router;
