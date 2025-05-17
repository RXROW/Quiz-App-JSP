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

import 'react-toastify/dist/ReactToastify.css';
import MasterAdminLayout from './modules/Shared/MasterAdminLayout/components/MasterAdminLayout';
import Dashboard from './modules/Dashboard/Dashboard';
import Quizzes from "./modules/Instructors/Quizzes/Quizzes";
import Groups from "./modules/Instructors/Groups/Groups";
import Questions from "./modules/Instructors/Questions/Questions";
import Student from "./modules/Instructors/Student/Student";




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
      { path: "quizzes", element: <Quizzes /> },
      { path: "groups", element: <Groups /> },
      { path: "questions", element: <Questions /> },
      { path: "student", element: <Student /> },
      
    ],
  }
]);

const App = () => {

  return (
 <>
    <RouterProvider router={router} />
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
  />
 </>
  )
  


};

export default App;
