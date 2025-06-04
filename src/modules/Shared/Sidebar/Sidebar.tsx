import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Link, useLocation } from 'react-router-dom'
import {
  FiHome,
  FiUsers,
  FiBook,
  FiLayers,
  FiFileText,
  FiBarChart2,
  
  FiMenu,
} from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { User } from '../../../interfaces/authInterfaces'
import { RootState } from '../../../Store/Store/Store'
import { LogoText } from '../../../ui/Logo'

const SideBar = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const userRole = useSelector(
    (state: RootState) => state.auth.user
  ) as User | null

  const toggleSidebar = () => setCollapsed(!collapsed)

  const getActiveItem = () => {
    const path = location.pathname.split('/')[2] || 'dashboard'
    return path
  }

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <FiHome size={24} />,
      active: 'dashboard',
      roles: ['Instructor', 'Student'],
    },
    {
      title: 'Students',
      path: 'students',
      icon: <FiUsers size={24} />,
      active: 'students',
      roles: ['Instructor'],
    },
    {
      title: 'Questions',
      path: 'questions',
      icon: <FiBook size={24} />,
      active: 'questions',
      roles: ['Instructor'],
    },
    {
      title: 'Groups',
      path: 'groups',
      icon: <FiLayers size={24} />,
      active: 'groups',
      roles: ['Instructor'],
    },
    {

      title: "Quizzes",
      path: "quizzes",

      icon: <FiFileText size={24} />,
      active: 'quizzes',
      roles: ['Instructor', 'Student'],
    },
    {
      title: 'Results',
      path: 'results',
      icon: <FiBarChart2 size={24} />,
      active: 'results',
      roles: ['Instructor', 'Student'],
    },
  ]

  // const helpItem = {
  //   title: "Help",
  //   path: "",
  //   icon: <FiHelpCircle size={24} />,
  //   active: "help",
  //   roles: ["Instructor", "Student"],
  // };

  return (
    <div className="h-full sticky">
      <Sidebar
        collapsed={collapsed}
        collapsedWidth="100px"
        className="bg-white shadow-md h-full flex flex-col justify-between"
      >
        <Menu>
          {/* Toggle Button */}
          <MenuItem
            icon={
              <div className="flex items-center justify-center size-full rounded-full bg-gray-200">
                <FiMenu size={24} className="text-[#0D1321]" />
              </div>
            }
            onClick={toggleSidebar}
            className="border border-gray-300 p-3 hover:bg-gray-100 cursor-pointer"
          >
            {collapsed ? '' : <LogoText color='black' />}
          </MenuItem>

          {/* Main Menu Items */}
          {menuItems.map((item) =>
            userRole && item.roles.includes(userRole.role) ? (
              <MenuItem
                key={item.title}
                icon={
                  <div
                    className={`flex items-center justify-center size-full rounded-full transition-all duration-200 ${
                      getActiveItem() === item.active
                        ? 'bg-black'
                        : 'bg-gray-200'
                    }`}
                  >
                    {React.cloneElement(item.icon, {
                      className: `text-2xl ${
                        getActiveItem() === item.active
                          ? 'text-white'
                          : 'text-black'
                      }`,
                    })}
                  </div>
                }
                component={<Link to={item.path} />}
                className={`border border-gray-300 p-2 hover:bg-gray-100 transition-all duration-200 ${
                  getActiveItem() === item.active
                    ? 'bg-gray-200 border-r-4 border-r-[#0D1321]'
                    : ''
                }`}
              >
                <span
                  className={`text-[#0D1321] ${
                    getActiveItem() === item.active ? 'font-semibold' : ''
                  }`}
                >
                  {item.title}
                </span>
              </MenuItem>
            ) : null
          )}
        </Menu>

        {/* {userRole && helpItem.roles.includes(userRole.role) && (
          <Menu className="mt-auto">
            <MenuItem
              icon={
                <div
                  className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                    getActiveItem() === helpItem.active ? "bg-[#0D1321]" : "bg-gray-200"
                  }`}
                >
                  {React.cloneElement(helpItem.icon, {
                    className: `text-2xl ${
                      getActiveItem() === helpItem.active ? "text-white" : "text-[#0D1321]"
                    }`,
                  })}
                </div>
              }
              component={<Link to={helpItem.path} />}
              className={`border border-gray-300 py-2 hover:bg-gray-100 transition-all duration-200 ${
                getActiveItem() === helpItem.active
                  ? "bg-gray-200 border-r-4 border-r-[#0D1321]"
                  : ""
              }`}
            >
              <span
                className={`text-[#0D1321] ${
                  getActiveItem() === helpItem.active ? "font-semibold" : ""
                }`}
              >
                {helpItem.title}
              </span>
            </MenuItem>
          </Menu>
        )} */}
      </Sidebar>
    </div>
  )
}

export default SideBar
