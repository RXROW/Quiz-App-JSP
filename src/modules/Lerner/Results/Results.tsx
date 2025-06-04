// @ts-ignore
// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Store/Store/Store'
import { User } from '../../../interfaces/authInterfaces'
import Spinner from '../../../ui/Spinner'
import { QUIZ } from '../../../services/apis/apisUrls'
import { privateInstance } from '../../../services/apis/apisConfig'

interface Quiz {
  _id: string
  title: string
  group: {
    _id: string
    name: string
  }
  participants?: any[]
  createdAt: string
  closed_at?: string
  difficulty: string
  questions_number: number
  score_per_question: number
  status: string
  code: string
  description: string
  duration: number
}

interface QuizResult {
  _id: string
  quiz: Quiz
  participants: any[]
}

const Results: React.FC = () => {
  const location = useLocation()
  const score = location.state?.score
  const quizId = location.state?.quizId

  const user = useSelector((state: RootState) => state.auth.user) as User | null
  const [completedQuizzes, setCompletedQuizzes] = useState<Quiz[]>([])
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')

        const quizzesResponse = await privateInstance.get(
          QUIZ.LAST_FIVE_COMPLETED
        )

        const mappedQuizzes = quizzesResponse.data.map((quiz: any) => ({
          _id: quiz._id,
          title: quiz.title,
          group: {
            _id: quiz.group?._id || '',
            name: quiz.group?.name || 'No group',
          },
          participants: quiz.participants || [],
          createdAt: quiz.createdAt,
          closed_at: quiz.closed_at,
          difficulty: quiz.difficulty || 'unknown',
          questions_number: quiz.questions_number || 0,
          score_per_question: quiz.score_per_question || 0,
          status: quiz.status || 'unknown',
          code: quiz.code || '',
          description: quiz.description || '',
          duration: quiz.duration || 0,
        }))
        setCompletedQuizzes(mappedQuizzes)

        if (user?.role === 'Instructor') {
          const resultsResponse = await privateInstance.get(QUIZ.ALL_RESULTS)
          setQuizResults(resultsResponse.data || [])
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load results. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user?.role])

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-18">
        <Spinner size="size-12" />
      </div>
    )
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {score !== undefined && (
        <div className="md:w-1/3 mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold mt-4">Your score is {score}%</h1>
          <p className="mt-2 text-gray-600">
            {score === undefined
              ? 'No score found yet!'
              : score > 50
              ? 'Great Job! You have passed the quiz'
              : score === 50
              ? 'You passed! With more practice you can do even better.'
              : 'Keep practicing and try again. You can improve!'}
          </p>
          {user?.role !== 'Instructor' && (
            <Link
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 my-4 inline-block rounded-md transition-colors"
              to="/quizzes"
            >
              {score ? 'Try Another Quiz' : 'Join Quiz'}
            </Link>
          )}
        </div>
      )}

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Recently Completed Quizzes
        </h2>
        <div className="overflow-x-auto border rounded-lg shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-white text-center">
              <tr>
                <th className="p-3">Quiz Title</th>
                <th className="p-3">Difficulty</th>
                <th className="p-3">Questions</th>
                <th className="p-3">Score per Q</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Participants</th>
                <th className="p-3">Status</th>
                {/* {user?.role === 'Instructor' && (
                  <th className="p-3">Actions</th>
                )} */}
              </tr>
            </thead>
            <tbody>
              {completedQuizzes.length > 0 ? (
                completedQuizzes.map((quiz) => (
                  <tr
                    key={quiz._id}
                    className="border-b hover:bg-gray-50 text-center"
                  >
                    <td className="p-3">{quiz.title}</td>
                    <td className="p-3 capitalize">{quiz.difficulty}</td>
                    <td className="p-3">{quiz.questions_number}</td>
                    <td className="p-3">{quiz.score_per_question}</td>
                    <td className="p-3">{quiz.duration} min</td>
                    <td className="p-3">{quiz.participants?.length || 0}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          quiz.status === 'closed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {quiz.status}
                      </span>
                    </td>
                    {/* {user?.role === 'Instructor' && (
                      <td className="p-3">
                        <Link
                          
                          className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded text-sm"
                        >
                          View
                        </Link>
                      </td>
                    )} */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={user?.role === 'Instructor' ? 9 : 8}
                    className="p-3 text-center text-gray-500"
                  >
                    No quizzes completed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {user?.role === 'Instructor' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            All Quiz Data
          </h2>
          <div className="overflow-x-auto border rounded-lg shadow">
            <table className="w-full text-left">
              <thead className="bg-gray-800 text-white text-center">
                <tr>
                  <th className="p-3">Quiz Title</th>
                  <th className="p-3">Difficulty</th>
                  <th className="p-3">Questions</th>
                  <th className="p-3">Score per Question</th>
                  <th className="p-3">Participants</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {quizResults.length > 0 ? (
                  quizResults.map((result, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 text-center"
                    >
                      <td className="p-3">
                        {result.quiz?.title || 'No title'}
                      </td>
                      <td className="p-3 capitalize">
                        {result.quiz?.difficulty || 'N/A'}
                      </td>
                      <td className="p-3">
                        {result.quiz?.questions_number || 0}
                      </td>
                      <td className="p-3">
                        {result.quiz?.score_per_question || 0}
                      </td>
                      <td className="p-3">
                        {result.participants?.length || 0}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            result.quiz?.status === 'closed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {result.quiz?.status || 'unknown'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-3 text-center text-gray-500">
                      No quiz results available yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Results
