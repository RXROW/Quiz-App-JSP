import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar';
import Navbar from '../../Navbar/Navbar';


const MasterAdminLayout = () => {
  return (
  
     <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col flex-1 h-full">
        <Navbar />
        
        <div className="overflow-y-auto flex-1 px-4 py-2 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterAdminLayout;
