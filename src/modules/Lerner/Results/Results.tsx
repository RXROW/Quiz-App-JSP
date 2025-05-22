import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { useAppSelector } from '../../redux/store'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Store/Store/Store'
import { User } from '../../../interfaces/authInterfaces'

// API Configuration
const BASE_URL = 'https://upskilling-egypt.com:3005/api'
const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: localStorage.getItem('token') },
})

const QUIZ = {
  LAST_FIVE_COMPLETED: `/quiz/completed`,
  ALL_RESULTS: `/quiz/result`,
}

interface Quiz {
  title: string
  groupName: string
  groupSize: string
  participants: string
  date: string
}

interface Result {
  studentName: string
  score: number
  average: number
  timeSubmitted: string
}

const Results: React.FC = () => {
  const location = useLocation()
  const score = location.state?.score

  const user = useSelector((state: RootState) => state.auth.user) as User | null
  const [completedQuizzes, setCompletedQuizzes] = useState<Quiz[]>([])
  const [quizResults, setQuizResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompletedQuizzes = async () => {
      try {
        const response = await AXIOS_INSTANCE.get(QUIZ.LAST_FIVE_COMPLETED)
        setCompletedQuizzes(response.data || [])
      } catch (error) {
        console.error('Error fetching completed quizzes:', error)
      }
    }

    const fetchQuizResults = async () => {
      try {
        const response = await AXIOS_INSTANCE.get(QUIZ.ALL_RESULTS)
        setQuizResults(response.data || [])
      } catch (error) {
        console.error('Error fetching quiz results:', error)
      }
    }

    const fetchData = async () => {
      setLoading(true)
      await Promise.all([fetchCompletedQuizzes(), fetchQuizResults()])
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Individual Score Feedback (if applicable) */}
      {score !== undefined && (
        <div className="md:w-1/3 mx-auto text-center mb-6">
          <img
            className="w-full"
            src={score > 50 ? success : score === undefined ? noResult : fail}
            alt="student vector"
          />
          <h1 className="text-3xl font-bold">Your score is {score}</h1>
          <p className="mt-2">
            {score === undefined
              ? 'No score found yet!'
              : score > 50
              ? 'Great Job! You have passed the quiz'
              : score === 50
              ? 'You’re halfway there! Just a bit more effort, and you’ll reach your goal.'
              : 'Keep pushing forward, and don’t be afraid to try again. Success is just around the corner!'}
          </p>
          {user?.role !== 'Instructor' && (
            <Link
              className="bg-green-600 text-white px-4 py-2 my-4 inline-block rounded-md"
              to="/quizzes"
            >
              {score ? 'Join another quiz' : 'Join Quiz'}
            </Link>
          )}
        </div>
      )}

      {/* Completed Quizzes Table */}
      <h2 className="text-2xl font-bold mb-4">Completed Quizzes</h2>
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Group name</th>
              <th className="p-2">No. of persons in group</th>
              <th className="p-2">Participants</th>
              <th className="p-2">Date</th>
              {user?.role === 'Instructor' && <th className="p-2"></th>}
            </tr>
          </thead>
          <tbody>
            {completedQuizzes.length > 0 ? (
              completedQuizzes.map((quiz, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{quiz.title || 'Assembly language'}</td>
                  <td className="p-2">{quiz.groupName || 'Group 1'}</td>
                  <td className="p-2">{quiz.groupSize || '23 persons'}</td>
                  <td className="p-2">
                    {quiz.participants || '20 participants'}
                  </td>
                  <td className="p-2">{quiz.date || '12/02/2023'}</td>
                  {user?.role === 'Instructor' && (
                    <td className="p-2">
                      <button className="bg-green-500 text-white px-4 py-1 rounded">
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={user?.role === 'Instructor' ? 6 : 5}
                  className="p-2 text-center"
                >
                  No completed quizzes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detailed Results Table (Instructor Only) */}
      {user?.role === 'Instructor' && (
        <>
          <h2 className="text-2xl font-bold my-4">Quiz Results</h2>
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-left">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-2">Student name</th>
                  <th className="p-2">Score</th>
                  <th className="p-2">Average</th>
                  <th className="p-2">Time submitted</th>
                </tr>
              </thead>
              <tbody>
                {quizResults.length > 0 ? (
                  quizResults.map((result, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">
                        {result.studentName || 'Jacob Hamuel'}
                      </td>
                      <td className="p-2">{result.score || 16}</td>
                      <td className="p-2">{result.average || 20}</td>
                      <td className="p-2">{result.timeSubmitted || '09:00'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-2 text-center">
                      No results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default Results
