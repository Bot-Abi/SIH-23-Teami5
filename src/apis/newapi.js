import {sidapi} from "./config/axiosConfig";
import { defineCancelApiObject } from "./config/axiosUtils";

export const NewAPI={

    postPatDetails: async (patient_name,category_id, cancel = false) => {
        const response = await sidapi.request({
            url: "sih/allocate_doctor/",
            method: "POST",
            data: patient_name,category_id,
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },

    postDelPat: async (patient_name,cancel = false) => {
        const response = await sidapi.request({
            url: "sih/remove_patient/",
            method: "POST",
            data: patient_name,
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },

    getPatByDocId: async (docid,cancel = false) => {
        const response = await sidapi.request({
            url: "sih/doctor_app/"+docid,
            method: "GET",
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            signal: cancel ? cancelApiObject[this.get.name].handleRequestCancellation().signal : undefined
        });

        return response.data;
    },

}

const cancelApiObject = defineCancelApiObject(NewAPI);