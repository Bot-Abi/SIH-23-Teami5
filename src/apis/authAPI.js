import {shakthiapi} from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";


export const AuthAPI = {

    postLogin: async (login, cancel = false) => {
        const response = await shakthiapi.request({
            url: "patient/login",
            method: "POST",
            data: login,
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },

    postEmail: async (uid, cancel = false) => {
        const response = await shakthiapi.request({
            url: "patient/sendotp",
            method: "POST",
            data: uid,
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },

    postVerifyOtp: async (otp, cancel = false) => {
        const response = await shakthiapi.request({
            url: "patient/authotp",
            method: "POST",
            data: otp,
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },

    postPhone: async (uid, cancel = false) => {
        const response = await shakthiapi.request({
            url: "patient/sendotp/phone",
            method: "POST",
            data: uid,
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },

    postPhoneVerifyOtp: async (otp, cancel = false) => {
        const response = await shakthiapi.request({
            url: "patient/authotp/phone",
            method: "POST",
            data: otp,
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },


}

const cancelApiObject = defineCancelApiObject(AuthAPI);