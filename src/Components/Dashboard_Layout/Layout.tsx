import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
export default function Layout() {
  return (
  
  <div className='flex flex-row min-h-screen w-screen overflow-hidden overflow-x-hidden'>
  {/* <Sidebar/> */}
  <div className='flex-1 flex flex-col'>
    <Header/>
    <div className="flex-1 overflow-y-auto pb-16 pt-4 px-4">
      {<Outlet/>}
    </div>
  </div>
</div>
  )
}
