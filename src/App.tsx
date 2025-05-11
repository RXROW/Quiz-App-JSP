import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from './modules/Shared/NotFound/NotFound';
import AuthLayouts from './modules/Shared/AuthLayout/AuthLayouts';
import Login from './modules/Auth/Login/Login';
import Register from './modules/Auth/Register/Register';
import ForgotPassword from './modules/Auth/Forgot Password/ForgotPassword';
import ResetPassword from './modules/Auth/Reset password/ResetPassword';
import ChangePassword from './modules/Auth/Change Password/ChangePassword';
import { ToastContainer } from 'react-toastify';
import MasterAdminLayout from './modules/Shared/MasterAdminLayout/components/MasterAdminLayout';
import Dashboard from './modules/Dashboard/Dashboard';



const router = createBrowserRouter([
  
  {
    path: "/",
    element: <AuthLayouts />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgotPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
  {
    path: '/dashboard',
    element: <MasterAdminLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
    ],
  }
]);

const App = () => {
  return<>
    <ToastContainer/>
    <RouterProvider router={router} />
  </>

};

export default App;
