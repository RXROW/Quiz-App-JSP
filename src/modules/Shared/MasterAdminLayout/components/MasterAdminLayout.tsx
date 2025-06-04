 
import { Outlet } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import SideBar from '../../Sidebar/Sidebar';


const MasterAdminLayout = () => {
  return (
  
     <div className="flex h-screen">
      <SideBar />
      
      <div className="flex flex-col flex-1 h-full">
        <Navbar />
        
        <div className=" flex-1 px-4 py-2 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterAdminLayout;
