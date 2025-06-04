
import { Link, Outlet, useLocation } from "react-router-dom"; 
import authImage from "../../../assets/AuthLogo.png";
import { IoPersonSharp, IoPersonAdd } from "react-icons/io5";
import Logon from "../../../ui/Logo";

 function AuthLayouts() {

  const location = useLocation();
    const allowedPaths = ["/", "/login", "/register"];

  const Login =
    location.pathname === "/login"
      ? "border-[4px] border-[#C5D86D] text-"
      : location.pathname === "/"
      ? "border-[4px] border-[#C5D86D] text-(--color-auth)"
      : "text-white ";
  const Register =
    location.pathname === "/register"
      ? "border-[4px] border-[#C5D86D] text-(--color-auth)"
      : "text-white ";
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
           {/* <img src={Logo} alt="Logo" className="w-48 pb-12 " /> */}
           <Logon className="w-48 pb-12" size="large" />
           
           <h1 className="text-4xl font-bold pb-12">
           {getPageTitle()}
           </h1>

           {allowedPaths.map(
            (item) =>
              item === location.pathname && (
                <div className="my-10 flex gap-8" key={item}>
                  <Link to="/login">
                    <div
                      className={`flex h-[120px] w-[150px] flex-col items-center justify-center rounded-lg bg-[#333333]  shadow ${Login}`}
                    >
                      <IoPersonSharp className="text-6xl" />
                      <span className="font-bold capitalize">sign in</span>
                    </div>
                  </Link>
                  <Link to="/register">
                    <div
                      className={`flex  h-[120px] w-[150px] flex-col items-center justify-center rounded-lg bg-[#333333] shadow ${Register}`}
                    >
                      <IoPersonAdd className="text-6xl" />
                      <span className="font-bold capitalize"> Sign Up</span>
                    </div>
                  </Link>
                </div>
              )
          )}

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