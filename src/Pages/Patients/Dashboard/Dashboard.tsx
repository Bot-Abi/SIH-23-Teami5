import React, { useEffect,useState } from "react";
import Loader from "../../../Components/Loader/index";
import CustomPagination from "../../../Components/Pagination/CustomPagination";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Dropdown,Select,Card,Col,Row,Space,Button,Modal } from "antd";
import { MenuProps, Switch } from "antd";
import ModalContainer from "../../../Components/ModalContainer/ModalContainer";
import Input from "../../../Components/Input/Input";
import { AiOutlineSearch } from "react-icons/ai";
import { Radio } from "antd";
// import { BASE_URL } from "../../../constants/apiConstant";
import { get } from "http";
// import { ReportAPI } from "../../../apis/reportapi";
import { CommonAPI } from "../../../apis/commonapi";

interface Report {
    date: string;
    test_name: string;
    lab: string;
    lab_name: string;
    patient_name: string;
  }
  
const initialData = {
    hospital:"",
    category:"",
    doctor:""
  };

const Dashboard = () => {
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

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Test Name',
      dataIndex: 'test_name',
      key: 'test_name',
    },
    {
      title: 'Lab Name',
      dataIndex: 'lab_name',
      key: 'lab_name',
    },
    {
        title: 'Report Pdf',
        dataIndex: 'report_pdf',
        key: 'report_pdf',
        render: (text:any, record:any) => (
          <a href={text} target="_blank" rel="noopener noreferrer">
            View Report
          </a>
        ),
      },
  ];

  const navigate = useNavigate();
  

  const [search, setSearch] = useState("");
 
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hospital,setHospital] = React.useState<any>([]);
  const [category,setCategory] = React.useState<any>([]);
  const [doctor,setDoctor] = React.useState<any>([]);
  const [slot,setSlots] = React.useState<any>([]);


  const getSlot = async (selectedHospital:string,  selectedCategory: string,selectedDoctor: string, cancel = false) => {
    try {
      setLoading(true);
      const dataum = await CommonAPI.getSlot(selectedHospital,selectedCategory,selectedDoctor, cancel);
  
      console.log("Slot Data:", dataum);
  
      if (Array.isArray(dataum)) {
        const slotOptions = dataum.map((slotItem: any) => ({
          label: `${slotItem.slot_name} - ${slotItem.slot_time}`,
          value: slotItem.id,
          start_time:slotItem.start_time,
          end_time:slotItem.end_time,
        }));
  
        setSlots(slotOptions); 
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

  const getDoctorById = async (selectedHospital:string,selectedCategory: string) => {
    try {
      setLoading(true);
      console.log("Selected Category:", selectedCategory); 
      const dataum = await CommonAPI.getDoctorById({ selectedHospital ,selectedCategory  });
      console.log("Doctor Data:", dataum);
      if (Array.isArray(dataum)) {
        const doctorOptions = dataum.map((doctorItem: any) => ({
          label: doctorItem.doctor_name,
          value: doctorItem.doctor_id,
          phone: doctorItem.phone, 
          degree: doctorItem.degree,
          doctor_id:doctorItem.doctor_id,
        }));
  
        setDoctor(doctorOptions);
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

  const getDoctor = async (selectedHospital:any, selectedCategory:any) => {
    try {
      setLoading(true);
      console.log("Selected Category:", selectedCategory);
      const dataum = await CommonAPI.getDoctor();
      console.log("Doctor Data:", dataum);
      if (Array.isArray(dataum)) {
        const filteredDoctors = dataum.filter((doctorItem) => {
          return (
            doctorItem.hospital === selectedHospital &&
            doctorItem.categories.includes(selectedCategory)
          );
        });
  
        const doctorOptions = filteredDoctors.map((doctorItem) => ({
          label: doctorItem.doctor_name,
          value: doctorItem.doctor_id,
          phone: doctorItem.phone,
          degree: doctorItem.degree,
          doctor_id:doctorItem.doctor_id,
        }));
  
        setDoctor(doctorOptions);
      }
    } catch (error) {
      // const errMsg =
      //   error?.response?.data?.message || error?.message || "Something went wrong";
      // console.log(errMsg);
      // toast.error(errMsg);
      const errMsg =
      (error as Error)?.message || "Something went wrong"; 
      console.log(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };
  



  const getCategory = async (selectedHospital: string) => {
    try {
      setLoading(true);
      const dataum = await CommonAPI.getCategory({ hospital: selectedHospital });
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
    getHospital();
    // getDoctorById(selectedHospital,selectedCategory)
  }, []);
   
  useEffect(() => {
    if (formData?.hospital) {
      getCategory(formData?.hospital);
    }
  }, [formData?.hospital]);
 

  const items = [
    {
      key: "1",
      label: "Time Slot 1"
    },
    {
      key: "1",
      label: "Time Slot 1"
    },
    {
      key: "1",
      label: "Time Slot 1"
    },
    {
      key: "1",
      label: "Time Slot 1"
    },
    {
      key: "1",
      label: "Time Slot 1"
    },
    {
      key: "1",
      label: "Time Slot 1"
    },
    {
      key: "1",
      label: "Time Slot 1"
    },
    {
      key: "1",
      label: "Time Slot 1"
    },
    {
      key: "1",
      label: "Time Slot 1"
    },
  ];




  const [selectedHospital, setSelectedHospital] = useState("");

  const handleHospitalChange = (e:any) => {
    setFormData((prev: any) => ({ ...prev, hospital: e }));
    setSelectedHospital(e);
    console.log(e)
  };

  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (e:any) => {
    setFormData((prev: any) => ({ ...prev, category: e }));
    setSelectedCategory(e);
    console.log(e)
  };



  useEffect(() => {
    if (selectedHospital !== "" && selectedCategory !== "") {
      getDoctor(selectedHospital, selectedCategory);
    }
  }, [selectedHospital, selectedCategory]);

  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [showSlots, setShowSlots] = useState(false);

  const toggleSlots = () => {
    setShowSlots(!showSlots);
  };

  useEffect(() => {
    if (selectedDoctorId !== null) {
      getSlot(selectedHospital,selectedCategory,selectedDoctorId);
    }
  }, [selectedDoctorId]);
  

  const [selectedSlot, setSelectedSlot] = useState(null);
 
  

const handleSlotClick = (slot:any) => {
  console.log(user?.uid);
  setSelectedSlot(slot);
  const postData = {
    start_time:slot.start_time,
    doctor_id: selectedDoctorId,
    patient_id: user?.uid
  };
  Modal.confirm({
    title: 'Confirm Slot Booking',
    content: `Do you want to book the slot from ${slot.start_time} to ${slot.end_time}?`,
    onOk: async() => {
      try {
        setLoading(true);
        const data = await CommonAPI.postSlot(postData);
        console.log(postData);
        if (data.success) {
          toast.success(data.message);
          setSelectedSlot(null);
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
    },
    onCancel: () => {
      setSelectedSlot(null);
    },
    okButtonProps: {
      style: {
        backgroundColor: '#007bff', 
        borderColor: '#007bff', 
        color: '#fff', 
      },
    },
  });
};

  return (
    <div className="mt-[20px] w-[100%] overflow-x-scroll md:overflow-hidden">
       <ToastContainer />
      {/* {loading ? <Loader /> : null} */}
      <div className="mb-[20px] flex gap-[15px]">
        <p className="font-semibold text-[20px]">Choose your desired Hospital</p>
      </div>
      <div className="mt-[30px]">
          {/* <Input
            label="Hospital Name"
            name="hospital"
            type="text"
            placeholder="Enter Hospital Name"
            className="rounded-[12px]"
            value={hospital}
            handleChange={(e:any) => setHospital(e.target.value)}
          /> */}
             <div className="col-span-1 flex flex-col">
          <label className="text-[#333333] opacity-70 font-semibold text-[14px]">
            Hospital
          </label>
          <Select
            showSearch
            className="border-[1px] text-[14px] h-[100%] mt-[5px] rounded-[4px] p-[5px]"
            placeholder="Search to Select"
            options={hospital}
            onChange={handleHospitalChange}
          />
        </div>
        <div className="col-span-1 flex flex-col mt-[15px]">
          <label className="text-[#333333] opacity-70 font-semibold text-[14px]">
            Category
          </label>
          <Select
            showSearch
            className="border-[1px] text-[14px] h-[100%] mt-[5px] rounded-[4px] p-[5px]"
            placeholder="Search to Select"
            options={category}
            onChange={handleCategoryChange}
          />
        </div>

      </div>
      {selectedCategory !== "" && (
      <div className="mt-[15px]">
      <p className="text-[#333333] opacity-70 font-semibold text-[14px]">
            Doctors
      </p>
      <Row gutter={16}>
        <Col span={12}>
          {doctor.map((doctorItem: any) => (
            <Card
              title="Profile"
              bordered={false}
              className="mt-[15px] border"
              data-doctor-id={doctorItem.doctor_id}
              key={doctorItem.value}
            >
              <div className="flex">
                <div className="w-1/2 pr-4">
                  <p>Name: {doctorItem.label}</p>
                  <p>Degree: {doctorItem.degree}</p>
                  <p>Phone: {doctorItem.phone}</p>
                </div>
                
              </div>
              <Button className="mt-[5px]" onClick={() => setSelectedDoctorId(doctorItem.doctor_id)}>
                Check Available Slots
              </Button>
            </Card>
          ))}
        </Col>
        <Col span={12}>
          <Card title="Doctor Slots" bordered={false} className="mt-[15px] border">
            <Space direction="horizontal" wrap>
              {slot.map((slot: any) => (
                <div
                  key={slot.id}
                  // className={`border p-2 rounded-md ${
                  //   slot.status ? 'text-green-500' : 'text-red-500'
                  // }`}
                  className="border p-2 rounded-md hover-bg-color hover-pointer"
                  onClick={() => handleSlotClick(slot)}
                >
                  {`${slot.start_time} - ${slot.end_time}`}
                </div>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
      </div>
      )}
      
    </div>
  );
};

export default Dashboard;
