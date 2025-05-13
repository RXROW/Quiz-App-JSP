import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FcAlarmClock } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa";
import logo from '../../../assets/Q.svg';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/dashboard/questions': return 'Questions';
      case '/dashboard/quizzes': return 'Quizzes';
      case '/dashboard/student': return 'Student';
      case '/dashboard/groups': return 'Groups';
      case '/dashboard/results': return 'Results';
      default: return '';
    }
  };

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-screen-xl flex items-center justify-between px-4 mx-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-semibold text-gray-800">{getPageTitle()}</h1>
          </div>
          <button className="flex items-center border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out text-sm shadow-sm hover:shadow-md">
            <FcAlarmClock className="me-2 text-2xl" />
            <span className="font-medium">New quiz</span>
          </button>
        </div>

        <div className="h-6 w-px bg-gray-300 mx-4" />

        <div ref={dropdownRef} className="relative text-right">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
          >
            <div>
              <div className="font-semibold">UserName</div>
              <div className="text-sm text-green-500">UserRole</div>
            </div>
            <FaChevronDown className="text-gray-500 text-sm" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                onClick={() => navigate('/change-password')}
              >
                Change Password
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                onClick={() => alert('Logout')}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
