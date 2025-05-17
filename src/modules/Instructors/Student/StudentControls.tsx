import { LayoutList, LayoutGrid, Grid3x3 } from 'lucide-react';
import { IoGrid } from 'react-icons/io5';
import { CiCircleList } from "react-icons/ci";


const columnOptions = [
  { id: 1, icon: LayoutList },
  { id: 2, icon: LayoutGrid },
  { id: 3, icon: Grid3x3 },
];

export default function StudentControls({
  searchTerm,
  setSearchTerm,
  studentsPerPage,
  setStudentsPerPage,
  columns,
  setColumns,
  cardStyle,
  setCardStyle
}: any) {
  return (
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-6">

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none "
      />

      <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">


        {/* Students Per Page */}
        <div className="bg-gray-200 text-sm text-gray-500 border-2 border-gray-200 rounded-full inline-flex select-none">
          {[6, 12, 24].map((num) => (
            <button key={num} onClick={() => setStudentsPerPage(num)}
              className={`px-4 py-2 transition-colors duration-300 ${
                studentsPerPage === num ? 'bg-white text-blue-400 rounded-full' : 'hover:text-blue-400'
              }`}>
              {num}
            </button>
          ))}
        </div>

              <div className="bg-gray-200 text-sm text-gray-500 border-2 border-gray-200 rounded-full hidden md:inline-flex select-none">
  {columnOptions.map(({ id, icon: Icon }) => (
    <button
      key={id}
      onClick={() => setColumns(id)}
      className={`px-4 py-2 transition-colors duration-300 ${
        columns === id ? 'bg-white text-blue-400 rounded-full' : 'hover:text-blue-400'
      }`}
    >
      <Icon className="w-5 h-5" />
    </button>
  ))}
</div>


              <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex select-none">
        <button
          onClick={() => setCardStyle('new')}
          className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-l-full px-4 py-2 ${
            cardStyle === 'new' ? 'bg-white text-blue-400' : 'hover:text-blue-400 focus:text-blue-400'
          }`}
          id="grid"
          type="button"
        >
         
            <IoGrid className='text-[18px] me-[5px]' />

          <span>Grid</span>
        </button>

        <button
          onClick={() => setCardStyle('old')}
          className={`inline-flex items-center transition-colors duration-300 ease-in focus:outline-none rounded-r-full px-4 py-2 ${
            cardStyle === 'old' ? 'bg-white text-blue-400' : 'hover:text-blue-400 focus:text-blue-400'
          }`}
          id="list"
          type="button"
        >
          
            <CiCircleList className='text-[18px] me-[5px]'/>

          <span>List</span>
        </button>
      </div>
              
        {/* <AddButton text="Add Student" /> */}
      </div>
    </div>
  );
}
