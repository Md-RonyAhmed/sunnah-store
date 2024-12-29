import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const axiosPrivateInstance = axios.create({
  baseURL: "https://sunnah-store-server-azure.vercel.app/",
});
const usePrivateAxios = () => {
  const navigate = useNavigate();
  const { signOutUser } = useContext(AuthContext);

  // request interceptor to add authorization header for every secure call to teh api
  axiosPrivateInstance.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log("request stopped by interceptors", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // intercepts 401 and 403 status
  axiosPrivateInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      // console.log('status error in the interceptor', status);
      // for 401 or 403 logout the user and move the user to the login
      if (status === 401 || status === 403) {
        await signOutUser();
        navigate("/sunnah-store/signin");
      }
      return Promise.reject(error);
    }
  );

  return axiosPrivateInstance;
};

export default usePrivateAxios;
