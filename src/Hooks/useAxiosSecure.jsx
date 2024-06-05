import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOutUser } = useAuth();

    axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
            const status = error.response?.status;

            if (status === 403 || status === 401) {
                console.log("Unauthorized or forbidden request, logging out...");
                await logOutUser();
                navigate("/login"); 
            }

            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
