// @ts-ignore
// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { privateInstance } from '../../services/apis/apisConfig'
import { QUIZ, STUDENT } from '../../services/apis/apisUrls'
import StudentDetailsModal from '../Shared/StudentModal/StudentDetailsModal'
import { RootState } from '../../Store/Store/Store'
import { Student, User } from '../../interfaces/authInterfaces'
import {
  Quiz,
  QuizApiResponse,
  StudentApiResponse,
} from '../../interfaces/DashboardInterfaces'
import { Link } from 'react-router-dom'
import { QuizCard } from './QuizCard'
import { StudentCard } from './StudentCard'
import Spinner from '../../ui/Spinner'





const Dashboard: React.FC = () => {
  const [upcomingQuizzes, setUpcomingQuizzes] = useState<Quiz[]>([])
  const [topStudents, setTopStudents] = useState<Student[]>([])
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState<boolean>(true)
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(true)
  const [selectedStudent, setSelectedStudent] =
    useState<StudentApiResponse | null>(null)

  const userRole = useSelector(
    (state: RootState) => state.auth.user
  ) as User | null
  const username: string = 'User'

  useEffect(() => {
    const fetchUpcomingQuizzes = async () => {
      try {
        const response = await privateInstance.get<QuizApiResponse[]>(
          QUIZ.FIRST_FIVE_INCOMMING
        )
        const quizzes: Quiz[] = response.data.map((quiz: QuizApiResponse) => {
          const scheduleDate = new Date(quiz.schadule)
          return {
            title: quiz.title,
            date: scheduleDate.toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            }),
            time: scheduleDate.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            }),
            code: quiz.code,
            studentCount: quiz.participants,
            isActive: quiz.status === 'open',
          }
        })
        setUpcomingQuizzes(quizzes)
      } catch (error) {
        console.error('Error fetching upcoming quizzes', error)
        setUpcomingQuizzes([]) 
      } finally {
        setIsLoadingQuizzes(false)
      }
    }

    const fetchTopStudents = async () => {
      try {
        const response = await privateInstance.get<StudentApiResponse[]>(
          STUDENT.GET_TOP_FIVE_STUDENTS
        )
        const students: Student[] = response.data.map(
          (student: StudentApiResponse) => ({
            name: `${student.first_name} ${student.last_name}`,
            groupName: student.group.name,
            avgScore: Math.round(student.avg_score ) || student.avg_score,
            apiData: student,
          })
        )
        setTopStudents(students)
      } catch (error) {
        console.error('Error fetching top students', error)
        setTopStudents([]) 
      } finally {
        setIsLoadingStudents(false)
      }
    }

    fetchUpcomingQuizzes()
    fetchTopStudents()
  }, [])

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming 5 quizzes
          </h2>
          {isLoadingQuizzes ? (
            <div className="bg-white py-8 rounded-lg shadow-sm border border-gray-200 flex justify-center items-center ">
              <Spinner size="size-12" />
            </div>
          ) : upcomingQuizzes.length === 0 ? (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h2>No upcoming quizzes available</h2>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingQuizzes.map((quiz: Quiz, index: number) => (
                <QuizCard key={index} {...quiz} />
              ))}
            </div>
          )}
          <Link
            to="quizzes"
            className="text-green-900 italic font-semibold text-md mt-2 inline-block group"
          >
            View Quiz directory{' '}
            <i className="fas fa-arrow-right group-hover:translate-x-1"></i>
          </Link>
        </div>

        {userRole?.role === 'Instructor' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Top 5 Students
            </h2>
            {isLoadingStudents ? (
              <div className="bg-white py-8 rounded-lg shadow-sm border border-gray-200 flex justify-center items-center ">
                <Spinner size="size-12" />
              </div>
            ) : topStudents.length === 0 ? (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <h2>No top students available</h2>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="divide-y divide-gray-200">
                  {topStudents.map((student: Student, index: number) => (
                    <StudentCard
                      key={index}
                      {...student}
                      onView={setSelectedStudent}
                    />
                  ))}
                </div>
              </div>
            )}
            <Link
              to="students"
              className="text-green-900 italic font-semibold text-md mt-2 inline-block group"
            >
              View All Students{' '}
              <i className="fas fa-arrow-right group-hover:translate-x-1"></i>
            </Link>
          </div>
        )}
      </div>

      <StudentDetailsModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        openModal={!!selectedStudent}
      />
    </div>
  )
}

export default Dashboard
