import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PasswordInput from '../../Shared/PasswordInput/PasswordInput';
import { useChangePasswordMutation } from '../../../Redux/Api/AuthApi';

export type User = {
  password: string;
  password_new: string;
  Confirm_Password: string;
};

const ChangePassword: React.FC = () => {
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

  const [changePassword] = useChangePasswordMutation();
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
    if (data.password_new !== data.Confirm_Password) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await changePassword({
        oldPassword: data.password,
        newPassword: data.password_new,
      }).unwrap();

      toast.success("Password changed successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Error changing password");
    }
  };

  return (
    <div className=" p-6 bg-black rounded-lg shadow">
      <form onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput
          id="password"
          label="Old Password"
          typeVisible={showPassword.password}
          toggle={() => toggleVisibility("password")}
          error={errors.password?.message}
          register={register("password", { required: "old password is required" })}
        />
        <PasswordInput
          id="password_new"
          label="New Password"
          typeVisible={showPassword.password_new}
          toggle={() => toggleVisibility("password_new")}
          error={errors.password_new?.message}
          register={register("password_new", { required: "New password is required" })}
        />
        <PasswordInput
          id="Confirm_Password"
          label="Confirm New Password"
          typeVisible={showPassword.Confirm_Password}
          toggle={() => toggleVisibility("Confirm_Password")}
          error={errors.Confirm_Password?.message}
          register={register("Confirm_Password", {
            required: "Please confirm your new password",
            validate: (value) => value === password_new || "Passwords do not match"
          })}
        />

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

export default ChangePassword;
