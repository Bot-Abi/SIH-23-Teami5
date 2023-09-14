import {shakthiapi} from "./config/axiosConfig";
import {sidapi} from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const CommonAPI={

    getHospital: async (id, cancel = false) => {
        const response = await sidapi.request({
            url:"sih/hospitals",
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },
 
    getCategory: async (id, cancel = false) => {
        const response = await sidapi.request({
            url: "sih/categories",
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },

    getDoctor: async (id, cancel = false) => {
        const response = await sidapi.request({
            url: "sih/doctors",
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },

    getDoctorById: async (hospid,catid, cancel = false) => {
        const response = await shakthiapi.request({
            url: "doctor/hospital/"+hospid+"/category/"+catid,
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },

    getSlot: async (hospid,category,docid,cancel = false) => {
        const response = await sidapi.request({
            url: `sih/hospital/${hospid}/category/${category}/doctor/${docid}/slots/`,
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },

    postSlot: async (slot_time,docid,uid, cancel = false) => {
        const response = await shakthiapi.request({
            url: "/slot",
            method: "POST",
            data: slot_time,docid,uid,
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },


    

}

const cancelApiObject = defineCancelApiObject(CommonAPI);