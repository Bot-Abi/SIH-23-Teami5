import React from "react";
import { Route, Routes } from "react-router-dom";
// import Register from "";
// import Forgot from "../../Pages/Patients/Auth/Forgot";
import Layout from "../Dashboard_Layout/Layout";
// import Dashboard from "../../Pages/Admin/Dashboard";
// import Home from "../../Pages/Admin/Home";
// import Admin from "../../Pages/Admin";
import Login from "../../Pages/Patients/Auth/Login";
import Pat_Dash_Rep from "../../Pages/Patients/Dashboard/Report";
import Dashboard from "../../Pages/Patients/Dashboard/Dashboard";
// import Doc_Dashboard from "../../Pages/Doctors/Dashboard/Doc_Dashboard";
import {
  LOGIN,
  REGISTER,
  FORGOT,
  DASHBOARD,
  DASHBOARD_HOME,
  ROOT,
  PATIENT_DASHBOARD_REPORT,
  LOGINPHONE,
  DOC_DASHBOARD
} from "./Constant";
import LoginPhone from "../../Pages/Patients/Auth/LoginPhone";

export const RouterConfig = () => {
  

  return (
    <Routes>
      {/* <Route path={ROOT} element={<Home />} /> */}
      <Route path={ROOT} element={<Login />} />
      <Route path={LOGINPHONE} element={<LoginPhone/>}/>
      {/* <Route path={REGISTER} element={<Register />} /> */}
      {/* <Route path={VERIFY_OTP} element={<VerifyOtp/>}/>
      <Route path={RESET} element={<Reset/>}/>
      <Route path={CHANGE_PASSWORD} element={<ChangePassword />} /> */}
      <Route path={DASHBOARD} element={<Layout/>}>
             <Route path={DASHBOARD_HOME} element={<Dashboard/>}></Route>
             <Route path={PATIENT_DASHBOARD_REPORT} element={<Pat_Dash_Rep/>}></Route>
             {/* <Route path={DOC_DASHBOARD} element={<Doc_Dashboard/>}></Route> */}
      </Route>
    </Routes>
  );
};
