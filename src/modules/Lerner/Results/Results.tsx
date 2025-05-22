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
  participants?: number
  createdAt: string
  closed_at?: string
}

interface QuizResult {
  _id: string
  student: {
    _id: string
    userName: string
  }
  quiz: {
    _id: string
    title: string
  }
  score: number
  createdAt: string
}

const Results: React.FC = () => {
  const location = useLocation()
  const score = location.state?.score
  const quizId = location.state?.quizId

  const user = useSelector((state: RootState) => state.auth.user) as User | null
  const [completedQuizzes, setCompletedQuizzes] = useState<Quiz[]>([])
  const [quizResults, setQuizResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')

        // Fetch completed quizzes
        const quizzesResponse = await privateInstance.get(
          QUIZ.LAST_FIVE_COMPLETED
        )
        // Map the API response to our expected format
        const mappedQuizzes = quizzesResponse.data.map((quiz: any) => ({
          _id: quiz._id,
          title: quiz.title,
          group: {
            _id: quiz.group?._id || '',
            name: quiz.group?.name || 'No group',
          },
          participants: quiz.participants || 0,
          createdAt: quiz.createdAt,
          closed_at: quiz.closed_at,
        }))
        setCompletedQuizzes(mappedQuizzes)

        // Fetch all results (for instructors)
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

  // Rest of the component remains the same...
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
      {/* Individual Score Feedback */}
      {score !== undefined && (
        <div className="md:w-1/3 mx-auto text-center mb-8">
          <img
            className="w-full max-w-xs mx-auto"
            src={score > 50 ? success : score === undefined ? noResult : fail}
            alt="result status"
          />
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

      {/* Completed Quizzes Table */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Recently Completed Quizzes
        </h2>
        <div className="overflow-x-auto border rounded-lg shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3">Quiz Title</th>
                <th className="p-3">Group</th>
                <th className="p-3">Participants</th>
                <th className="p-3">Date Completed</th>
                {user?.role === 'Instructor' && (
                  <th className="p-3">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {completedQuizzes.length > 0 ? (
                completedQuizzes.map((quiz) => (
                  <tr key={quiz._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{quiz.title}</td>
                    <td className="p-3">{quiz.group?.name || 'No group'}</td>
                    <td className="p-3">{quiz.participants || 0}</td>
                    <td className="p-3">
                      {formatDate(quiz.closed_at || quiz.createdAt)}
                    </td>
                    {user?.role === 'Instructor' && (
                      <td className="p-3">
                        <Link
                          to={`/quiz/results/${quiz._id}`}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        >
                          View Results
                        </Link>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={user?.role === 'Instructor' ? 5 : 4}
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

      {/* Detailed Results Table (Instructor Only) */}
      {user?.role === 'Instructor' && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            All Quiz Results
          </h2>
          <div className="overflow-x-auto border rounded-lg shadow">
            <table className="w-full text-left">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-3">Student</th>
                  <th className="p-3">Quiz</th>
                  <th className="p-3">Score</th>
                  <th className="p-3">Date Submitted</th>
                </tr>
              </thead>
              <tbody>
                {quizResults.length > 0 ? (
                  quizResults.map((result) => (
                    <tr key={result._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        {result.student?.userName || 'Unknown'}
                      </td>
                      <td className="p-3">
                        {result.quiz?.title || 'No title'}
                      </td>
                      <td className="p-3 font-medium">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            result.score >= 50
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {result.score}%
                        </span>
                      </td>
                      <td className="p-3">{formatDate(result.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-3 text-center text-gray-500">
                      No results available yet.
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
