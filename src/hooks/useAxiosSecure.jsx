import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://medidx-clinic-server.vercel.app",
  // baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const { LogOut } = useAuth() || {};
  const navigate = useNavigate();
  //for request
  axiosSecure.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  //for response
  axiosSecure.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      //   console.log("response", response);

      return response;
    },
    async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log("error", error?.response?.status);
      const statusCode = error?.response?.status;
      if (statusCode === 401) {
        toast.error("UnAuthorized Access");
      }
      if (statusCode === 403) {
        toast.error("Forbidden Access");
      }
      if (statusCode === 401 || statusCode === 403) {
        await LogOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
