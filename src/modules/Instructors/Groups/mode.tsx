import React from 'react';

const Modalrr = ({ isOpen, onClose, onSubmit, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/30">
      <div className="bg-white rounded-md shadow-md w-full max-w-md relative">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h3 className="text-md font-semibold">{title}</h3>
          <div className="flex items-center">
            <button
              onClick={onSubmit}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
            >
              ✔
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-gray-100"
            >
              ✖
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

export default Modalrr;
