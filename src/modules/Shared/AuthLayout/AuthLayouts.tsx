
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "../../../assets/Logo-white.png";
import authImage from "../../../assets/AuthLogo.png";
import { IoPersonSharp, IoPersonAdd } from "react-icons/io5";

 function AuthLayouts() {

  const location = useLocation();
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/login':
        return 'Login';
      case '/register':
        return 'Register';
      case '/forget-password':
        return 'Forgot Password';
      case '/reset-password':
        return 'Reset Password';
      case '/change-password':
        return 'Change Password';
      default:
        return 'Login';
    }
  };
   return (
     <>
       <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5 bg-black ">
        {/* Left Section */}

        <div className="auth-title p-12 lg:col-span-3 custom:col-span-12">
           <img src={Logo} alt="Logo" className="w-48 pb-12 " />
           
           <h1 className="text-4xl font-bold pb-12">
           {getPageTitle()}
           </h1>

          <Outlet />
        </div>

        {/* Right Section */}
        <div className="p-6 lg:col-span-2 custom:col-span-12 px-11 sm:px-6 ">
          <img
            src={authImage}
            alt="Quiz app Illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
     </>
   )
 }
 

export default AuthLayouts;