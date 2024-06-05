import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import MainApp from "./layouts/MainApp/MainApp.jsx";
import AuthProvider from "./providers/AuthProvider/AuthProvider.jsx";
import router from "./routes/MainRouter.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}>
            <MainApp />
          </RouterProvider>
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </>
);
