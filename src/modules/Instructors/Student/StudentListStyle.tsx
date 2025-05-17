import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import StudentCardActions from './StudentCardActions';

export default function StudentListStyle({ student, onDelete, onView }: any) {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex items-center">
        <img
          src={`https://i.pravatar.cc/150?u=${student._id}`}
          alt={student.first_name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="font-semibold text-base">
            {student.first_name} {student.last_name}
          </h4>
          <p className="text-sm text-gray-600">
            Group: {student.group?.name || 'No Group'}
          </p>
          <p className={`text-sm flex items-center ${student.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
            {student.status}
            {student.status === 'active'
              ? <IoMdCheckmarkCircleOutline className="ml-2" />
              : <IoMdCloseCircleOutline className="ml-2" />}
          </p>
        </div>
      </div>
          <StudentCardActions onDelete={() => onDelete(student._id)} onView={() => onView(student)} onEdit={student._id} />
          {/* <StudentCardActions
  onView={() => setSelectedStudent(student)}
  onEdit={() => handleEdit(student)}
  onDelete={() => handleDelete(student._id)}
/> */}

    </div>
  );
}
