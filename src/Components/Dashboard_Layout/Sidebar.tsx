import React from 'react'
import {FaUserDoctor} from 'react-icons/fa6'
import { AiOutlineMenu } from 'react-icons/ai';
import { FaThLarge } from "react-icons/fa";
import { BsCalendarCheck,BsFillPersonFill} from "react-icons/bs";
import { PiMessengerLogoLight } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import { DASHBOARD_HOME,ADMIN,PATIENT_DASHBOARD_REPORT } from '../navigation/Constant';
export default function Sidebar() {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate(DASHBOARD_HOME);
  };

  const handleAdminClick = () => {
    navigate(ADMIN);
  };
  
  const user = {
    accessLevel: 'patient',
    isAuthenticated: true,
  };
  
  return (
    <div className='bg-neutral-200 w-[250px] p-3 flex flex-col'>
       <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          <FaUserDoctor fontSize={30} />
          <span className='text-base font-semibold py-4'>Doc Care</span>
        </div>
        <span className='flex'>
          <AiOutlineMenu fontSize={15} />
        </span>
      </div>
      {user.accessLevel === 'patient' && (
        <>
        <div className='tab-item' onClick={() => { navigate(DASHBOARD_HOME);}}>Dashboard</div>
        <div className='tab-item' onClick={() => { navigate(PATIENT_DASHBOARD_REPORT);}}>My Reports</div>
        </>
      )}

      {user.accessLevel === 'doctor' && (
        <>
          <div className='tab-item'>Dashboard</div>
          <div className='tab-item'>Department</div>
          <div className='tab-item'>Doctors</div>
          <div className='tab-item'>Labs</div>
          <div className='tab-item'>Patients</div>
        </>
      )}
    </div>



  )
}
