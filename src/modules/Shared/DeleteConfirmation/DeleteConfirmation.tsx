import React from 'react';
import { Check, X } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  title = "Delete Confirmation",
  message = "Are you sure you want to delete this item?",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bg-[rgba(255,255,255,0.9)] inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white  bg-opacity-20 w-full max-w-md rounded-lg shadow-lg overflow-hidden backdrop-blur-md border border-gray-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-black">{title}</h2>
          <div className="flex items-center gap-2">
            <button onClick={onConfirm} className="p-1 hover:bg-gray-100 rounded">
              <Check className="w-5 h-5 text-green-600" />
            </button>
            <button onClick={onCancel} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className="px-6 py-6 text-gray-800">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteConfirmation;
