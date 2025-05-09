
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { publicInstance } from '../../../services/apis/apisConfig';
import { AUTH } from '../../../services/apis/apisUrls';

export type User = {
  password: string;
  password_new: string;
  Confirm_Password: string;
};

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    mode: "onChange",
    defaultValues: {
      password: '',
      password_new: '',
      Confirm_Password: ''
    }
  });

  const password_new = watch("password_new");
  const Confirm_Password = watch("Confirm_Password");
  const [showPassword, setShowPassword] = useState({
    password: false,
    password_new: false,
    Confirm_Password: false,
  });

  const toggleVisibility = (field: keyof typeof showPassword) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const onSubmit = async (data: User) => {
    if (data.password_new !== data.Confirm_Password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await publicInstance.post(AUTH.CHANGE_PASSWORD, {
        currentPassword: data.password,
        newPassword: data.password_new,
      });
      toast.success("Password changed successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error changing password");
    }
  };

  return (
    <div className="mt-10 p-6 bg-black rounded-lg shadow">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Current Password */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
            Current Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-white">
              <i className="fas fa-key text-lg" />
            </span>
            <input
              id="password"
              type={showPassword.password ? 'text' : 'password'}
              placeholder="Enter current password"
              className="bg-black border border-white text-white text-sm rounded-lg w-full p-2.5 pl-10"
              {...register("password", { required: "Current password is required" })}
            />
            <button
              type="button"
              onClick={() => toggleVisibility('password')}
              className="absolute right-3 top-3 text-white text-sm focus:outline-none cursor-pointer"
            >
              <i className={`far text-lg ${showPassword.password ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* New Password */}
        <div className="mb-4 relative">
          <label htmlFor="password_new" className="block text-sm font-medium text-white mb-1">
            New Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-white">
              <i className="fas fa-key text-lg" />
            </span>
            <input
              id="password_new"
              type={showPassword.password_new ? 'text' : 'password'}
              placeholder="Enter new password"
              className="bg-black border border-white text-white text-sm rounded-lg w-full p-2.5 pl-10"
              {...register("password_new", { required: "New password is required" })}
            />
            <button
              type="button"
              onClick={() => toggleVisibility('password_new')}
              className="absolute right-3 top-3 text-white text-sm focus:outline-none cursor-pointer"
            >
              <i className={`far text-lg ${showPassword.password_new ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>
          {errors.password_new && (
            <p className="text-red-500 text-xs mt-1">{errors.password_new.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="mb-4 relative">
          <label htmlFor="Confirm_Password" className="block text-sm font-medium text-white mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-white">
              <i className="fas fa-key text-lg" />
            </span>
            <input
              id="Confirm_Password"
              type={showPassword.Confirm_Password ? 'text' : 'password'}
              placeholder="Confirm new password"
              className="bg-black border border-white text-white text-sm rounded-lg w-full p-2.5 pl-10"
              {...register("Confirm_Password", {
                required: "Please confirm your new password",
                validate: value => value === password_new || "Passwords do not match",
              })}
            />
            <button
              type="button"
              onClick={() => toggleVisibility('Confirm_Password')}
              className="absolute right-3 top-3 text-white text-sm focus:outline-none cursor-pointer"
            >
              <i className={`far text-lg ${showPassword.Confirm_Password ? 'fa-eye-slash' : 'fa-eye'}`} />
            </button>
          </div>
          {errors.Confirm_Password && (
            <p className="text-red-500 text-xs mt-1">{errors.Confirm_Password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
        <button
            type="submit"
            className="flex items-center gap-1 w-fit text-black bg-[#F5F5F5] hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-3 cursor-pointer"
            disabled={isSubmitting}
          >
            Change <i className="fas fa-check-circle text-black text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
