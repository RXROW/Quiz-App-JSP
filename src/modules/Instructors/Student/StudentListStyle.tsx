import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import StudentCardActions from './StudentCardActions';

export default function StudentListStyle({ student, onDelete, onView }: any) {

  const styles = [
    'adventurer',
    'adventurer-neutral',
    'avataaars',
    'big-ears',
    'bottts',
    'croodles',
    'icons',
    'identicon',
    'lorelei',
    'micah',
    'miniavs',
    'open-peeps',
    'personas',
    'pixel-art',
    'thumbs',
  ]

  const randomStyle = styles[Math.floor(Math.random() * styles.length)]

  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4 hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="flex items-center">
        <img
          src={`https://api.dicebear.com/6.x/${randomStyle}/svg?seed=${student._id}`}
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
          <p
            className={`text-sm flex items-center ${
              student.status === 'active' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {student.status}
            {student.status === 'active' ? (
              <IoMdCheckmarkCircleOutline className="ml-2" />
            ) : (
              <IoMdCloseCircleOutline className="ml-2" />
            )}
          </p>
        </div>
      </div>
      <StudentCardActions
        onDelete={() => onDelete(student._id)}
        onView={() => onView(student)}
        onEdit={student._id}
      />
      {/* <StudentCardActions
  onView={() => setSelectedStudent(student)}
  onEdit={() => handleEdit(student)}
  onDelete={() => handleDelete(student._id)}
/> */}
    </div>
  )
}
