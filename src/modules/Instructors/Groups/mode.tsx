import { CheckIcon, XIcon } from 'flowbite-react';
import React from 'react';

const ModalGroup = ({ isOpen, onClose, onSubmit, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/30">
      <div className="bg-white rounded-md shadow-md w-full max-w-md relative">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-md font-semibold">{title}</h3>
          <div className="flex items-center">
            <button
              onClick={onSubmit}
          className="px-4 py-3 hover:bg-gray-100  text-black flex items-center justify-center border-l border-black"
            >
               <CheckIcon className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
          className="px-4 py-3 hover:bg-gray-100  text-black flex items-center justify-center border-l border-black"
            >
            <XIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="px-6 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalGroup;
