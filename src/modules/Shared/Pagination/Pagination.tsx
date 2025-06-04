import { ChevronLeft, ChevronRight } from 'lucide-react'
 

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const renderPages = () => {
    const pages: number[] = []
    const maxPagesToShow = 5

   
    pages.push(1)

    if (totalPages <= maxPagesToShow + 2) {
      
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      
      if (currentPage <= 3) {
        
        for (let i = 2; i <= 4; i++) {
          pages.push(i)
        }
        pages.push(-1) 
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        
        pages.push(-1) 
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        
        pages.push(-1) 
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push(-1) 
        pages.push(totalPages)
      }
    }

    return pages.map((p, idx) =>
      p === -1 ? (
        <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
          ...
        </span>
      ) : (
        <button
          key={p}
          className={`px-3 py-1 rounded-full text-sm border ${
            currentPage === p
              ? 'bg-black text-white border-black'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
          }`}
          onClick={() => onPageChange(p)}
          disabled={currentPage === p}
        >
          {p}
        </button>
      )
    )
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        className={`p-1 rounded-full text-sm border ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        }`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </button>

      {renderPages()}

      <button
        className={`p-1 rounded-full text-sm border ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </button>
    </div>
  )
}
