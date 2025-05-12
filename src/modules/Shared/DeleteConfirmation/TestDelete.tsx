// src/pages/TestDelete.tsx أو أي مكان وضعت فيه هذا الملف
import React, { useState } from 'react';
import DeleteConfirmation from './DeleteConfirmation';

const TestDelete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = () => {
    console.log("Deleted");
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-red-600 hover:underline"
      >
        Delete Group
      </button>

      <DeleteConfirmation
        isOpen={isModalOpen}
        title="Delete Group"
        message="Are you sure you want to delete this group?"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TestDelete;
