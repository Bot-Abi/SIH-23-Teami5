import React, { useEffect,useState } from "react";
import Loader from "../../Components/Loader/index";
import CustomPagination from "../../Components/Pagination/CustomPagination";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Dropdown,Select,Card,Col,Row,Space,Button,Modal } from "antd";
import { MenuProps, Switch } from "antd";
import ModalContainer from "../../Components/ModalContainer/ModalContainer";
import Input from "../../Components/Input/Input";
import { AiOutlineSearch } from "react-icons/ai";
import { Radio } from "antd";
// import { BASE_URL } from "../../../constants/apiConstant";
import { get } from "http";
// import { ReportAPI } from "../../../apis/reportapi";
import { CommonAPI } from "../../apis/commonapi";
import { NewAPI } from "../../apis/newapi";



interface ReportData {
    date: string;
    test_name: string;
    lab: string;
    lab_name: string;
    patient_name: string;
  }
  
// interface ReportData {
//     name: string;
//     reports: Report[];
//   }


const Doc_Dashboard = () => {
  const [docid, setDocId] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [reportData, setReportData] = useState<any>([]);
  const [patient,setPatient] = React.useState<any>([]);
    
  const[delPat,setDelPat]= useState("");
   
  
  const postDelPat = async() => {
    console.log(delPat);
    try {
      setLoading(true);
      const data = await NewAPI.postDelPat({"patient_name":delPat})
      if (data.message) {
        console.log(data);
        toast.success("Patient consultation completed");
        getPatByDocId(docid);
      }
    } catch (error: any) {
      console.log("here");
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "something went wrong";
      console.log(errMsg);
      return toast.error(errMsg, {
        position: "top-right",
        // autoClose: 5000,
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

 const getPatByDocId = async (docid: any) => {
    try {
      setLoading(true);
      const dataum = await NewAPI.getPatByDocId(docid);
      console.log(docid);
      console.log("Doctor Data:", dataum);
      if (dataum && Array.isArray(dataum.patients)) {
        const doctorOptions = dataum.patients.map((patientItem: string, index: number) => ({
          key: index,
          patient: patientItem,
        }));
  
        setPatient(doctorOptions);
        setFormSubmitted(true);
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      console.log(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePatient = (record:any,index:number) => {
    const array = patient[index]; 
    setDelPat(array.patient);
    postDelPat();
  };

  const columns = [
    {
      title: 'Patient',
      dataIndex: 'patient',
      key: 'patient',
    },
    {
        title: 'Consultation Status',
        dataIndex: 'status',
        key: 'status',
        render: (text:any, record:any, index: number) => (
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-[20px] text-[15px]" onClick={() => handleRemovePatient(record,index)}>
            Remove Patient 
          </button>
        ),
      }
  ];
//   const getReportDoc = async (phone:any) => {
//     try {
//         setLoading(true);
//         const reportData = await ReportAPI.getReportDoc(phone);
//         console.log("Report Data:", reportData.reports);
//         setReportData(reportData);

//       } catch (err) {
//         console.log("Some error occurred:", err);
//         // const errMsg =
//         //   err?.response?.data?.message || err?.message || "Something went wrong";
//         // toast.error(errMsg);
//       } finally {
//         setLoading(false);
//       }
//   };

  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // getReportDoc(phoneNumber);
    //    getPatByDocId(docid)
  });

  const clearDetails = () => {
    setDocId("");
    setFormSubmitted(false);
  };
 

  return (
    <div className="mt-[20px] w-[100%] overflow-x-scroll md:overflow-hidden">
       <ToastContainer />
      {loading ? <Loader /> : null}
      <div className="mb-[20px] flex gap-[15px]">
        <p className="font-semibold text-[25px]">DOCTOR</p>
      </div>
      <div className="mt-[30px]">
          <Input
            label="Enter Your Doctor ID"
            name="docid"
            type="text"
            placeholder="Enter Doctor ID"
            className="rounded-[12px]"
            value={docid}
            handleChange={(e:any) => setDocId(e.target.value)}
          />
        <button
          type="submit"
          onClick={() => getPatByDocId(docid)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-[20px] text-[20px]"
        >
          Submit
        </button>

        <button
        type="button"
        onClick={clearDetails}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded mt-[20px] text-[20px] ml-[10px]"
      >
        Clear
      </button>
      </div>
      
      <div className="mt-[30px]"> 
      {formSubmitted && (
      <div>
          <p className="font-semibold text-[20px] mb-[10px] ">Patients:</p>
          <Table columns={columns} dataSource={patient} pagination={false} className="custom-table" />
      </div>
      )}
      </div>
      
    </div>
  );
};

export default Doc_Dashboard;
