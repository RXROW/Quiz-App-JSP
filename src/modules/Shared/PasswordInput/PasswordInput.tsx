import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  id: string;
  label: string;
  typeVisible: boolean;
  toggle: () => void;
  error?: string;
  register: UseFormRegisterReturn;
};

const PasswordInput: React.FC<Props> = ({ id, label, typeVisible, toggle, error, register }) => {
  return (
    <div className="mb-4 relative">
      <label htmlFor={id} className="block text-sm font-medium text-white mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">
          <i className="fas fa-key text-lg" />
        </span>
        <input
          id={id}
          type={typeVisible ? 'text' : 'password'}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="bg-black border border-white text-white text-sm rounded-lg w-full p-4 pl-10"
          {...register}
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-sm focus:outline-none cursor-pointer"
        >
          <i className={`far text-lg ${typeVisible ? 'fa-eye-slash' : 'fa-eye'}`} />
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;
