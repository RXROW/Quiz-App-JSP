import React, { useEffect, useState } from 'react';
import StudentDetailsModal from '../../Shared/StudentModal/StudentDetailsModal';
import PreLoader from '../../Shared/PreLoader/PreLoader';
import Pagination from '../../Shared/Pagination/Pagination';
import StudentListStyle from './StudentListStyle';
import StudentGridStyle from './StudentGridStyle';
import StudentControls from './StudentControls';
import NoData from '../../Shared/NoData/NoData';
import { useDeleteStudentMutation, useGetAllStudentsQuery } from '../../../Redux/Api/StudentApi';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';
import Spinner from '../../../ui/Spinner';


const columnClasses = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
};

export default function StudentList() {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(6);
  const [columns, setColumns] = useState(3);
  const [cardStyle, setCardStyle] = useState<'old' | 'new'>('old');

  const { data: students = [], isLoading, isError, refetch } = useGetAllStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [studentToDelete, setStudentToDelete] = useState<any>(null);


  useEffect(() => {
    const savedStyle = localStorage.getItem('studentCardStyle');
    if (savedStyle === 'old' || savedStyle === 'new') {
      setCardStyle(savedStyle);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('studentCardStyle', cardStyle);
  }, [cardStyle]);

  const handleDeleteClick = (student: any) => {
  setStudentToDelete(student);
  setShowDeleteModal(true);
};


  
  const confirmDelete = async () => {
  if (studentToDelete) {
    try {
      await deleteStudent(studentToDelete._id).unwrap();
      toast.success(`Student "${studentToDelete.first_name} ${studentToDelete.last_name}" deleted successfully`);
      refetch();
    } catch (error) {
      toast.error("Failed to delete student");
    } finally {
      setShowDeleteModal(false);
      setStudentToDelete(null);
    }
  }
};

const cancelDelete = () => {
  setShowDeleteModal(false);
  setStudentToDelete(null);
};


  if (isLoading) return <div className="flex items-center justify-center mt-18">
          <Spinner size="size-12" />
        </div>;
  if (isError) return <div className="text-center text-red-500">Error loading students.</div>;

  const filteredStudents = students.filter((student: any) =>
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = filteredStudents.slice((page - 1) * studentsPerPage, page * studentsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-4">

      <StudentControls
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  studentsPerPage={studentsPerPage}
  setStudentsPerPage={setStudentsPerPage}
  columns={columns}
  setColumns={setColumns}
  cardStyle={cardStyle}
  setCardStyle={setCardStyle}
/>
      
      <div className={`grid gap-4 grid-cols-1 ${columnClasses[columns]}`}>
  {paginatedStudents.length > 0 ? (
    paginatedStudents.map((student: any) => (
      cardStyle === 'old' ? (
        <StudentListStyle
          key={student._id}
          student={student}
          onDelete={() => handleDeleteClick(student)}

          onView={setSelectedStudent}
        />
      ) : (
        <StudentGridStyle
          key={student._id}
          student={student}
            onDelete={() => handleDeleteClick(student)}

          onView={setSelectedStudent}
        />
      )
    ))
  ) : (
    <div className='mx-auto'>
              
      <NoData message='No Student Found' />
    </div>
  )}
      </div>
      
      <DeleteConfirmation
  isOpen={showDeleteModal}
  title="Delete Student"
  message={`Are you sure you want to delete ${studentToDelete?.first_name} ${studentToDelete?.last_name}?`}
  onConfirm={confirmDelete}
  onCancel={cancelDelete}
/>



      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <StudentDetailsModal student={selectedStudent} onClose={() => setSelectedStudent(null)} openModal={!!selectedStudent} />
    </div>
  );
}