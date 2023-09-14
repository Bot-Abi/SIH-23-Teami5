import React from "react";
import { Link } from "react-router-dom";
import { ROOT } from "./Constant";


const NotFound = () => {
  return (
    <div className="bg-cover bg-bookings flex flex-col h-screen justify-center items-center space-y-10">
      <h1 className="font-sfDisplayBold text-secondary md:text-6xl text-4xl">404 Not Found &nbsp;:/</h1>
      <Link className="bg-primary text-white px-5 py-2 rounded-md hover:bg-opacity-60 transition-all duration-300" to={ROOT}>Go Back</Link>
    </div>
  )
};

export default NotFound;