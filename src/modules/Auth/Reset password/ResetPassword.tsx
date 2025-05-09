import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { publicInstance } from "../../../services/apis/apisConfig";
import { AUTH } from "../../../services/apis/apisUrls";

export type User = {
  password: string;
  email: string;
  password_new: string;
  otp: string;
  Confirm_Password: string;
};

const ResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      otp: "",
    },
  });

  const password_new = watch("password_new");
  const [showPassword, setShowPassword] = useState({
    password: false,
    password_new: false,
    Confirm_Password: false,
  });

  const toggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const onSubmit = async (data: User) => {
    try {
      const response = await publicInstance.post(AUTH.RESET_PASSWORD, data);
      toast.success("register changed successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error To register");
    }
  };

  return (
    <div className="mt-10 p-6 bg-black rounded-lg shadow">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Your email address */}
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white mb-1"
          >
            Email
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-white">
              <i className="fas fa-envelope  text-lg color-white" />
            </span>
            <input
              id="email"
              type="text"
              placeholder="Enter current email"
              className="bg-black border border-white text-white text-sm rounded-lg w-full p-2.5 pl-10"
              {...register("email", {
                required: "Your email is required",
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        {/* Your OTP address */}
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white mb-1"
          >
            otp
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-white">
              <i className="fas fa-key text-lg" />
            </span>
            <input
              id="otp"
              type="text"
              placeholder="Enter current otp"
              className="bg-black border border-white text-white text-sm rounded-lg w-full p-2.5 pl-10"
              {...register("otp", {
                required: "Your otp is required",
              })}
            />
          </div>
          {errors.otp && (
            <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
          )}
        </div>
        {/* Current Password */}

        {/* New Password */}
        <div className="mb-4 relative">
          <label
            htmlFor="password_new"
            className="block text-sm font-medium text-white mb-1"
          >
            New Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-white">
              <i className="fas fa-key text-lg" />
            </span>
            <input
              id="password"
              type={showPassword.password ? "text" : "password"}
              placeholder="Enter new password"
              className="bg-black border border-white text-white text-sm rounded-lg w-full p-2.5 pl-10"
              {...register("password", {
                required: "New password is required",
              })}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("password")}
              className="absolute right-3 top-3 text-white text-sm focus:outline-none cursor-pointer"
            >
              <i
                className={`far text-lg ${
                  showPassword.password ? "fa-eye-slash" : "fa-eye"
                }`}
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm New Password */}
        {/* <div className="mb-4 relative">
          <label
            htmlFor="Confirm_Password"
            className="block text-sm font-medium text-white mb-1"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-white">
              <i className="fas fa-key text-lg" />
            </span>
            <input
              id="Confirm_Password"
              type={showPassword.Confirm_Password ? "text" : "password"}
              placeholder="Confirm new password"
              className="bg-black border border-white text-white text-sm rounded-lg w-full p-2.5 pl-10"
              {...register("Confirm_Password", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === password_new || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => toggleVisibility("Confirm_Password")}
              className="absolute right-3 top-3 text-white text-sm focus:outline-none cursor-pointer"
            >
              <i
                className={`far text-lg ${
                  showPassword.Confirm_Password ? "fa-eye-slash" : "fa-eye"
                }`}
              />
            </button>
          </div>
          {errors.Confirm_Password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.Confirm_Password.message}
            </p>
          )}
        </div> */}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="flex items-center gap-1 w-fit text-black bg-[#F5F5F5] hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-3 cursor-pointer"
            disabled={isSubmitting}
          >
            Reset <i className="fas fa-check-circle text-black text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
