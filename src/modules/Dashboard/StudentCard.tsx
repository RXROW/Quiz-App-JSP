import { FaArrowRight } from "react-icons/fa"
import { Student, StudentApiResponse } from "../../interfaces/DashboardInterfaces"

export const StudentCard: React.FC<
  Student & { onView: (student: StudentApiResponse) => void }
> = ({ name, groupName, avgScore, apiData, onView }) => {
  
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
    <div className="flex items-center p-3 hover:bg-gray-50">
      <img
        src={`https://api.dicebear.com/6.x/${randomStyle}/svg?seed=${name}`}
        alt={name}
        className="w-10 h-10 rounded-full"
      />
      <div className="ml-3 flex-1">
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        <div className="text-xs text-gray-500">
          Class rank: {groupName} | Average score: {avgScore}%
        </div>
      </div>
      <button
        onClick={() => onView(apiData)}
        className="text-white text-sm hover:text-gray-200 size-5 text-center flex justify-center items-center cursor-pointer rounded-full bg-black"
      >
        <FaArrowRight />
      </button>
    </div>
  )
}