import { Quiz } from "../../interfaces/DashboardInterfaces"

export const QuizCard: React.FC<Quiz> = ({
  title,
  date,
  time,
 
  studentCount,
  isActive,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2 mt-1 text-xs text-gray-600">
            <span>{date}</span>
            <span>•</span>
            <span>{time}</span>
          </div>

          <div className="text-xs text-gray-500 mt-1">
            No. of students enrolled: {studentCount}
          </div>
        </div>
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {isActive ? 'Open' : 'Closed'}
        </span>
      </div>
    </div>
  )
}
