/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { X, Loader2, CheckCircle, Check, AlertTriangle } from "lucide-react";
import deletconfirm from "../../../assets/DeleteConfim.jpg";
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  status: string;
  size?:string ;
}
export default function DeleteModal: React.FC<DeleteModalProps>({
  isOpen,
  onClose,
  onConfirm,
  status,
  size = "md",
}) {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    // Prevent body scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  useEffect(() => {
    setTimeout(() => {
      if (status === "fulfilled" || status === "rejected") {
        onClose();
      }
    }, 1200);
  }, [status, onClose]);
  // Simulates the deletion process
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className={`${sizeClasses[size]} w-full transform rounded-lg bg-white shadow-lg transition-all`}
      >
        {/* Modal header */}
        <div className="flex w-full items-center justify-between border-b">
          <h2 className="px-4 text-lg font-semibold text-black">Delete Item</h2>
          <div className="flex">
            <button
              onClick={onConfirm}
              className="flex items-center justify-center border-l border-custom-black px-4 py-3 text-black hover:bg-gray-100 disabled:cursor-not-allowed"
              disabled={status === "pending"}
            >
              <Check className="h-5 w-5" />
            </button>
            <button
              disabled={status === "pending"}
              onClick={onClose}
              className="flex items-center justify-center border-l border-custom-black px-4 py-3 text-black hover:bg-gray-100 disabled:cursor-not-allowed"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        {/* Modal content */}
        <div className="p-3">
          {status === "uninitialized" && (
            <>
              <h2 className="text-center text-xl">
                Are you sure you want to delete this item?
              </h2>
              <div className="mx-auto my-4 w-2/4 rounded-md">
                <img src={deletconfirm} className="rounded-md" />
              </div>
            </>
          )}
          {status === "pending" && (
            <div className="flex flex-col items-center justify-center py-4">
              <div className="mb-4 animate-spin">
                <Loader2 size={60} className="mb-4 text-green-500" />
              </div>
              <p>Deleting item ..... </p>
            </div>
          )}
          {status === "fulfilled" && (
            <div className="flex flex-col items-center justify-center py-4">
              <CheckCircle size={60} className="mb-4 text-green-500" />
              <p className="text-xl text-gray-700">
                Item deleted successfully!
              </p>
            </div>
          )}
          {status === "rejected" && (
            <div className="flex flex-col items-center justify-center py-4">
              <AlertTriangle size={60} className="mb-4 text-red-500" />
              <p className="text-xl text-gray-700">Item deleted Failed!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
