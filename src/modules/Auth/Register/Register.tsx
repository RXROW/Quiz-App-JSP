import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import PasswordInput from '../../Shared/PasswordInput/PasswordInput';
import { RegisterFormData } from '../../../interfaces/authInterfaces';
import { useRegisterMutation } from '../../../Store/Authantication/AuthApi';

const Register: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const [showPassword, setShowPassword] = React.useState(false);
  const [registerUser, { isLoading }] = useRegisterMutation();

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const payload = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role,
        password: data.password,
      };
      await registerUser(payload).unwrap();
      toast.success('Registration successful!');
    } catch (error: any) {
      const errorMessages = error?.data?.message || ['Error registering'];
      if (Array.isArray(errorMessages)) {
        errorMessages.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error(errorMessages);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="first_name" className="block text-sm font-medium text-white mb-1">
            Your first name
          </label>
          <input
            id="first_name"
            type="text"
            placeholder="Type your first name"
            className="bg-black border border-white text-white text-sm rounded-lg w-full p-4"
            {...register('first_name', { required: 'First name is required' })}
          />
          {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
        </div>
        <div className="w-1/2">
          <label htmlFor="last_name" className="block text-sm font-medium text-white mb-1">
            Your last name
          </label>
          <input
            id="last_name"
            type="text"
            placeholder="Type your last name"
            className="bg-black border border-white text-white text-sm rounded-lg w-full p-4"
            {...register('last_name', { required: 'Last name is required' })}
          />
          {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
          Your email address
        </label>
        <input
          id="email"
          type="email"
          placeholder="Type your email"
          className="bg-black border border-white text-white text-sm rounded-lg w-full p-4"
          {...register('email', { required: 'Email is required' })}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-white mb-1">
          Your role
        </label>
        <select
          id="role"
          className="bg-black border border-white text-white text-sm rounded-lg w-full p-4"
          {...register('role', { 
            required: 'Role is required',
            validate: (value) => ['Instructor', 'Student'].includes(value) || 'Role must be Instructor or Student'
          })}
        >
          <option value="">Choose your role</option>
          <option value="Student">Student</option>
          <option value="Instructor">Instructor</option>
        </select>
        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
      </div>
      <PasswordInput
        id="password"
        label="Password"
        typeVisible={showPassword}
        toggle={toggleVisibility}
        register={register('password', { required: 'Password is required' })}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center gap-1 text-black bg-[#F5F5F5] hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-3 cursor-pointer disabled:opacity-50"
      >
        {isLoading ? 'Signing Up...' : 'Sign Up'} <i className="fas fa-check-circle text-black text-lg" />
      </button>
    </form>
  );
};

export default Register;