//  import React from 'react'
 
//  const MasterAdminLayout = () => {
//    return (
//      <div>MasterAdminLayout</div>
//    )
//  }
 
//  export default MasterAdminLayout

/**//////////// */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Sidebar/SideBar';
import Navbar from '../../Navbar/Navbar';


const MasterAdminLayout = () => {
  return (
  
     <div className="flex h-screen">
        <Sidebar />
        <div className=" w-full main ">
          <Navbar />
          <Outlet />
        </div>
      </div>
  );
};

export default MasterAdminLayout;
