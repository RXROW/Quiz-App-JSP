import React from 'react';

interface AddButtonProps {
  onClick?: () => void;
  text?: string;
}

export default function AddButton({ onClick, text  }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 border border-black rounded-full text-sm hover:bg-black hover:text-white transition"
    >
      <i className="fas fa-plus-circle text-lg"></i> {text}
    </button>
  );
}
