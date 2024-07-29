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

  
const initialData = {
    hospital:"",
    category:"",
    doctor:""
  };

const Recep = () => {

  const [user, setuser] = useState<any>({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log(user)
    setuser(JSON.parse(userData || "{}"));
  }, []);

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = React.useState(false);
  const [pagination, setPagination] = React.useState<any>({});
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [importData, setImportData] = React.useState<any>({
    myfile: null,
    record_size: 0,
  });

 
  const navigate = useNavigate();
  
  const [pat_name,setPatName]= useState("");
  const [hospital,setHospital] = React.useState<any>([]);
  const [category,setCategory] = React.useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (e:any) => {
    setFormData((prev: any) => ({ ...prev, category: e }));
    setSelectedCategory(e);
    console.log(e)
  };
  
  const postData = {
    category_id: selectedCategory,
    patient_name:pat_name,
  };
  const [allocatedDoctorId, setAllocatedDoctorId] = useState(null);
  const postPatDet = async() => {
    try {
      setLoading(true);
      const data = await NewAPI.postPatDetails(postData);
      console.log(data);
      if (data.allocated_doctor_id) {
        console.log(data);
        setAllocatedDoctorId(data.allocated_doctor_id);
        toast.success("Doctor allocated successfully");
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

  const getCategory = async () => {
    try {
      setLoading(true);
      const dataum = await CommonAPI.getCategory({});
      if (Array.isArray(dataum)) {
        const categoryOptions = dataum.map((categoryItem:any) => ({
          label: categoryItem.name,  
          value: categoryItem.id,    
        }));
  
        setCategory(categoryOptions);
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

  const getHospital = async () => {
    try {
      setLoading(true);
      const dataum = await CommonAPI.getHospital();
      // console.log(dataum);
  
      if (Array.isArray(dataum)) {
        const hospitalOptions = dataum.map((item) => ({
          label: item.name, 
          value: item.hospital_id,
        }));
  
        setHospital(hospitalOptions);
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";
      console.log(errMsg);
      return toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

   
  useEffect(() => {
      getCategory();
  }, []);

  const clearDetails = () => {
    setAllocatedDoctorId(null);
    setPatName(''); 
    setSelectedCategory(""); 
    setSelectKey(prevKey => prevKey + 1);
  };
 
  const [selectKey, setSelectKey] = useState(0);
  return (
    <div className="mt-[20px] w-[100%] overflow-x-scroll md:overflow-hidden">
       <ToastContainer />
      {loading ? <Loader /> : null}
      <div className="mb-[20px] flex gap-[15px]">
        <p className="font-semibold text-[25px]">RECEPTION</p>
      </div>
      <div className="mt-[30px]">
          <Input
            label="Patient Name"
            name="pat_name"
            type="text"
            placeholder="Enter Patient's Name"
            className="rounded-[12px] text-[20px] pl-[16px]"
            value={pat_name}
            handleChange={(e:any) => setPatName(e.target.value)}
          />

        <div className="col-span-1 flex flex-col mt-[15px]">
          <label className="text-[#333333] opacity-70 font-semibold text-[20px]">
            Category
          </label>
          <Select
           key={selectKey}
           className="border-[1px] text-[20px] h-[100%] mt-[5px] rounded-[4px] p-[5px]"
           placeholder="Search to Select"
           options={category}
           onChange={handleCategoryChange}
          />
        </div>

        <button
          type="submit"
          onClick={postPatDet} 
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

        {allocatedDoctorId && (
          <div className=" text-[20px] mt-4">
            Patient's Allocated doctor ID is: <span className="text-red-600 text-[20px]">{allocatedDoctorId}</span>
          </div>
        )}

      </div>

    </div>
  );
};

export default Recep;
