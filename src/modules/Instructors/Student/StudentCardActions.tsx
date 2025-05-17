import { useState, useEffect, useRef } from 'react';
import { FaTrash,  FaEye, FaArrowCircleRight } from 'react-icons/fa';

interface Props {
  onView: () => void;
  onDelete: () => void;
}

export default function StudentCardActions({ onView, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="text-black hover:text-gray-700 focus:outline-none"
        title="Actions"
      >
        <FaArrowCircleRight className="text-xl" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border ">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <button
                onClick={() => {
                  onView();
                  setOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
              >
                <FaEye /> View
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onDelete();
                  setOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                <FaTrash /> Delete
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
