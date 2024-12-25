import axios from "axios";

const axiosPublicInstance = axios.create({
  baseURL: "https://sunnah-store-server-azure.vercel.app/",
});

const usePublicAxios = () => {
  return axiosPublicInstance;
};

export default usePublicAxios;
