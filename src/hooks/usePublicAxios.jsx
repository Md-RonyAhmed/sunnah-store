import axios from "axios";


const axiosPublicInstance = axios.create({
    baseURL: 'http://localhost:5000/'
})

const usePublicAxios = () => {
    return axiosPublicInstance;
};

export default usePublicAxios;