import React from "react";
import { Check, X } from "lucide-react";
import Delete from "../../../assets/Questions-amico.png";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
   
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000040]">
  <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden border border-gray-200">
    <div className="flex items-center justify-between border-b w-full">
      <h2 className="text-lg font-semibold text-black px-4 ">
        Delete Group
      </h2>
      <div className="flex border-l border-black">
        <button
          onClick={onConfirm}
          className="px-4 py-3 hover:bg-gray-100  text-black flex items-center justify-center border-l border-black"
        >
          <Check className="w-5 h-5" />
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-3 hover:bg-gray-100  text-black flex items-center justify-center border-l border-black"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
    {message && (
      <div className="px-6 text-center py-6 text-gray-800 min-h-[200px]">
        <img src={Delete} alt="" />
        <p className="text-[20px]">
        {message}
        </p>
      </div>
    )}
  </div>
</div>

  );
};

export default DeleteConfirmation;
