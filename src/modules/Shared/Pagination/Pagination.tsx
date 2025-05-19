import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const renderPages = () => {
    const pages: number[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, -1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, -1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages);
      }
    }

    return pages.map((p, idx) =>
      p === -1 ? (
        <span key={idx} className="px-2 text-gray-500">...</span>
      ) : (
        <button
          key={p}
          className={`px-3 py-1 rounded-full text-sm border ${currentPage === p ? 'bg-black text-white' : 'bg-white text-gray-700 border-gray-300'}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      )
    );
  };

  return (
    <div className="flex justify-center gap-2 mt-6">
      {renderPages()}
    </div>
  );
}
