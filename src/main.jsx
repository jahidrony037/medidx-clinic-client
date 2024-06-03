import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import MainApp from "./layouts/MainApp/MainApp.jsx";
import router from "./routes/MainRouter.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <HelmetProvider>
      <RouterProvider router={router}>
        <MainApp />
      </RouterProvider>
    </HelmetProvider>
  </>
);
