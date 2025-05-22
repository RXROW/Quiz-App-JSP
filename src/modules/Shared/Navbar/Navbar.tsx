import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FcAlarmClock } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa";
import logo from "../../../assets/Q.svg";
import { RootState } from "../../../Store/Store/Store";
import { logout } from "../../../Store/Authantication/AuthSlice";
import { HiMenu } from "react-icons/hi";
import { LuLogOut } from "react-icons/lu";
import { TbLockPassword } from "react-icons/tb";
import { LogoIcons } from "../../../ui/Logo";



interface User {
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  status: string;
  _id: string;
}

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);


  const user = useSelector((state: RootState) => state.auth.user) as User | null;
  console.log("Redux User:", user);

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/dashboard/questions":
        return "Questions";
      case "/dashboard/quizzes":
        return "Quizzes";
      case "/dashboard/students":
        return "Students";
      case "/dashboard/groups":
        return "Groups";
      case "/dashboard/results":
        return "Results";
      default:
        return "";
    }
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
  
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between px-4 mx-auto py-2">
        {/* Left side (Logo + Page Title) */}
        <div className="flex items-center gap-3">
          <LogoIcons color="black"/>
          <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h1>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
           className="flex items-center border border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-100 hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out text-sm shadow-sm hover:shadow-md">
            <FcAlarmClock className="me-2 text-2xl" />
            <span className="font-medium">New quiz</span>
          </button>

          <div className="h-6 w-px bg-gray-300" />

          <div ref={dropdownRef} className="relative text-right">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
            >
              
              <div className="flex items-center gap-2">
  <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm uppercase">
    {user?.first_name?.[0]}{user?.last_name?.[0]}
  </div>
  <div className="text-center px-[5px]">
    <div className="font-semibold">{user?.first_name} {user?.last_name}</div>
    <div className="text-sm text-green-500">{user?.role}</div>
  </div>
</div>

              <FaChevronDown className="text-gray-500 text-sm" />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
                  onClick={() => navigate("/change-password")}
                >
                  <TbLockPassword className="me-2"/>
                  Change Password
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600 flex items-center"
                  onClick={handleLogout}
                >
                  <LuLogOut className="me-2"/>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            <HiMenu className="text-2xl text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 border-t border-gray-200">
          <button className="w-full flex items-center border border-gray-300 rounded-full px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm shadow-sm hover:shadow-md">
            <FcAlarmClock className="me-2 text-2xl" />
            <span className="font-medium">New quiz</span>
          </button>

          <div className="text-left">
            <div className="flex items-center gap-3">
  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm uppercase">
    {user?.first_name?.[0]}{user?.last_name?.[0]}
  </div>
  <div className="text-left">
    <div className="font-semibold">{user?.first_name} {user?.last_name}</div>
    <div className="text-sm text-green-500">{user?.role}</div>
  </div>
</div>


            <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm flex items-center"
                  onClick={() => navigate("/change-password")}
                >
                  <TbLockPassword className="me-2"/>
                  Change Password
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600 flex items-center"
                  onClick={handleLogout}
                >
                  <LuLogOut className="me-2"/>
                  Logout
                </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
