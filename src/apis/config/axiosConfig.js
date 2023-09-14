import axios from "axios";

import { BASE_URL } from "../../Constants/apiConstant";
import { AUTH_URL } from "../../Constants/apiConstant";

export const shakthiapi = axios.create({
    withCredentials:false,
    baseURL: BASE_URL,
})

export const sidapi = axios.create({
    withCredentials:false,
    baseURL: AUTH_URL,
})

const errorHandler = (error) => {
    const statusCode = error.response?.status;

    if (statusCode && statusCode!== 401){
        console.error(error);
    }

    return Promise.reject(error);
}

shakthiapi.interceptors.response.use(undefined,(error)=>{
    return errorHandler(error);
});

sidapi.interceptors.response.use(undefined,(error)=>{
    return errorHandler(error);
});