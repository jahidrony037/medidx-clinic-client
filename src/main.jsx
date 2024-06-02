import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import MainApp from "./layouts/MainApp/MainApp.jsx";
import router from "./routes/MainRouter.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router}>
      <MainApp />
    </RouterProvider>
  </>
);
