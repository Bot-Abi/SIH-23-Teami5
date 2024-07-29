import React,{useState,useEffect} from 'react'
import { AiOutlineSearch } from 'react-icons/ai';
import { useNavigate } from "react-router";
import {LOGIN,ROOT} from "../navigation/Constant";
import { MenuProps,Dropdown } from 'antd';
export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const [user, setuser] = useState<any>({});

  useEffect(() => {
    const userData = localStorage.getItem("user");
    console.log(user)
    setuser(JSON.parse(userData || "{}"));
  }, []);

  const logout = async () => {
    try {
      localStorage.removeItem("user");
      navigate(ROOT);
    } catch (err: any) {
      console.log(err);
      const errMsg = err?.response?.data?.message || "Something went wrong";
      alert(errMsg);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <a
          href="javascript:void(0)"
        >
          My Profile
        </a>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          className="logout flex gap-[10px] text-[red] items-center"
          onClick={() => logout()}
        >
          <i className="bi bi-box-arrow-left  text-[16px]"></i> Logout
        </button>
      ),
      key: "1",
    },
  ];

  return (
    <div>
    <div className="bg-gray-100 h-16 px-4 flex items-center justify-end mr-2 shadow-md ">
    <div className="bg-dark text-black text-3xl font-bold py-4 px-10 absolute left-12">
    {/* {isAdmin ? 'Admin' : 'Doctor'} */}
    </div>
   
   
         <Dropdown menu={{ items }} trigger={["click"]}>
         <div className="flex items-center ml-4">
         <img
            src="data:image/jpeg;base64,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"
            alt="Employee Profile"
            className="w-8 h-8 rounded-full"
            />
              <span className="ml-2 font-medium">
                {user?.name||"Admin"}
              </span>
             
            </div>
          </Dropdown>
    </div>
    </div>
  )
}
