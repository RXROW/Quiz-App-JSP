// @ts-ignore
// @ts-nocheck
import { useEffect, useRef } from "react";
import { TiTimesOutline } from "react-icons/ti";
interface ViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: string;
}
const ViewModal: React.FC<ViewModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  const modalRef = useRef(null);
  // Handle ESC key press
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

  // Handle click outside modal
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // Size classes
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  if (!isOpen) return null;
  return (
    <div
      // className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm p-4"

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
        <div className="flex items-center justify-between border-b p-4">
          <h2 id="modal-title" className="text-xl font-semibold text-gray-800">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Close modal"
          >
            <TiTimesOutline />
          </button>
        </div>
        {/* Modal content */}
        <div>{children}</div>
      </div>
    </div>
  );
};
export default ViewModal;
