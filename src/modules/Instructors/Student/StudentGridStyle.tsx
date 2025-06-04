
// @ts-ignore
// @ts-nocheck

import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import StudentCardActions from './StudentCardActions';

export default function StudentGridStyle({ student, onDelete, onView }: any) {

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
    <div className="w-full bg-white rounded-xl shadow-lg p-6 text-black flex flex-col items-center relative hover:shadow-lg hover:scale-105 transition-all duration-300">
      <div className="absolute top-3 right-3 flex gap-2">
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
      <img
        className="w-28 h-28 mb-4 rounded-full border-4 border-gray-200 shadow-md object-cover"
        src={`https://api.dicebear.com/6.x/${randomStyle}/svg?seed=${student._id}`}
        alt={student.first_name}
      />
      <h5 className="mb-1 text-2xl font-semibold text-gray-900">
        {student.first_name} {student.last_name}
      </h5>
      <p className="text-sm opacity-80 mb-1 text-gray-700">
        Group: {student.group?.name || 'No Group'}
      </p>
      <p
        className={`text-sm flex items-center ${
          student.status === 'active' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {student.status}
        {student.status === 'active' ? (
          <IoMdCheckmarkCircleOutline className="ml-1" />
        ) : (
          <IoMdCloseCircleOutline className="ml-1" />
        )}
      </p>
    </div>
  )
}
