import React, { useEffect,useState } from "react";
import Loader from "../../../Components/Loader/index";
import CustomPagination from "../../../Components/Pagination/CustomPagination";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Dropdown } from "antd";
import { MenuProps, Switch } from "antd";
import ModalContainer from "../../../Components/ModalContainer/ModalContainer";
import Input from "../../../Components/Input/Input";
import { AiOutlineSearch } from "react-icons/ai";
import { Radio } from "antd";
// import { BASE_URL } from "../../../constants/apiConstant";
import { get } from "http";
import { CommonAPI } from "../../../apis/commonapi";



interface Report {
    date: string;
    test_name: string;
    lab: string;
    lab_name: string;
    patient_name: string;
  }
  
  interface ReportData {
    name: string;
    reports: Report[];
  }

const Dashboard = () => {
    const [user, setuser] = useState<any>({});
    const [selectedPatient, setSelectedPatient] = React.useState<any>(
      localStorage.getItem("uid")
    );

    useEffect(() => {
      const userData = localStorage.getItem("user");

      setuser(JSON.parse(userData || "{}"));
    }, []);
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
  const [reportData, setReportData] = useState<any>([]);
  const getReport = async (userid:any) => {
    try {
        setLoading(true);
        // const reportData = await ReportAPI.getReport(userid);
        console.log("Report Data:", reportData);
        setReportData(reportData);

      } catch (err) {
        console.log("Some error occurred:", err);
        // const errMsg =
        //   err?.response?.data?.message || err?.message || "Something went wrong";
        // toast.error(errMsg);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    getReport(user.uid);
    const intervalId = setInterval(() => {
      getReport(user.uid);
    }, 500);
    return () => clearInterval(intervalId);
  }, [user.uid]);

  const [search, setSearch] = useState("");
  const filterData = () => {
    const lowercasedSearch = search.toLowerCase(); 
  
    return reportData.filter((report:any) => {
      const testName = report.test_name || ""; 
      const labName = report.lab_name || ""; 
      const lowercasedTestName = testName.toLowerCase(); 
      const lowercasedLabName = labName.toLowerCase(); 
  
      return (
        lowercasedTestName.includes(lowercasedSearch) ||
        lowercasedLabName.includes(lowercasedSearch)
      );
    });
  };

  return (
    <div className="mt-[20px] w-[100%] overflow-x-scroll md:overflow-hidden">
      <div className="mb-[20px] flex gap-[15px]">
        <p className="font-semibold text-[20px] ">
          My Reports
        </p>
        <div className="flex items-center ml-auto justify-center hidden md:block border-[#e5e5e5] px-[10px]">
          <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Test/Lab Search"
            className="px-4 py-2 pl-10 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-3 top-3">
            <AiOutlineSearch />
          </span>
        </div>

        </div>
      </div>

      {search === "" ? (
        <Table columns={columns} dataSource={reportData} pagination={false} />
      ) : (
        <Table columns={columns} dataSource={filterData()} pagination={false} />
      )}
    <div className="w-[100%] mt-[30px] items-end justify-end flex">
      <CustomPagination
        total={pagination?.total}
        current={currentPage}
        onChange={(page: any, pageSize: any) => {
          setCurrentPage(page === 0 ? 1 : page);
          setPageSize(pageSize);
        }}
      />
    </div>
    </div>
    
  );
};

export default Dashboard;
