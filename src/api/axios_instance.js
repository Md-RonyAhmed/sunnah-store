import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://sunnah-store-server-azure.vercel.app/",
});
