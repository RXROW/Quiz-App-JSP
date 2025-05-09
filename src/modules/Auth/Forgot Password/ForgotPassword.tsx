import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { publicInstance } from "../../../services/apis/apisConfig";
import { AUTH } from "../../../services/apis/apisUrls";
import { useNavigate } from "react-router-dom";

export type User = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: User) => {
    try {
      const response = await publicInstance.post(AUTH.FORGOT_PASSWORD, data);
      toast.success("OTp Send Check mail !");
      navigate("/reset-password");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error changing password");
    }
  };

  return (
    <div className="mt-10 p-6 bg-black rounded-lg shadow">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 relative">
          <label
            htmlFor="email"
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
        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="flex items-center gap-1 w-fit text-black bg-[#F5F5F5] hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-3 cursor-pointer"
            disabled={isSubmitting}
          >
            Send email <i className="fas fa-check-circle text-black text-lg" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
