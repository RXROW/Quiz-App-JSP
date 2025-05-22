import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { QUIZ } from '../../../services/apis/apisUrls'
import { privateInstance } from '../../../services/apis/apisConfig'
import Spinner from '../../../ui/Spinner'

interface Question {
  _id: string
  text: string
  options: string[]
}

interface Answer {
  questionId: string
  selectedOption: string
}

export default function AnswerQuiz() {
  const { quizId } = useParams<{ quizId: string }>() 
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Answer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)


  const fetchQuestions = async () => {
    if (!quizId) {
      toast.error('Invalid quiz ID')
      setIsLoading(false)
      return
    }

    try {
      const response = await privateInstance.get(
        QUIZ.QUESTIONS_WITHOUT_ANSWERS(quizId)
      )
      
      const fetchedQuestions = Array.isArray(response.data.questions)
        ? response.data.questions
        : Array.isArray(response.data)
        ? response.data
        : []
      setQuestions(fetchedQuestions)
      
      setAnswers(
        fetchedQuestions.map((question: Question) => ({
          questionId: question._id,
          selectedOption: '',
        }))
      )
    } catch (error: any) {
      console.error('Failed to fetch questions:', error)
      toast.error(
        error.response?.data?.message || 'Failed to load quiz questions'
      )
      setQuestions([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestions()
  }, [quizId])

  
  const handleOptionChange = (questionId: string, selectedOption: string) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.questionId === questionId
          ? { ...answer, selectedOption }
          : answer
      )
    )
  }

  
  const handleSubmit = async () => {
    if (!quizId) {
      toast.error('Invalid quiz ID')
      return
    }

    
    const unansweredQuestions = answers.filter(
      (answer) => !answer.selectedOption
    )
    if (unansweredQuestions.length > 0) {
      toast.error('Please answer all questions before submitting')
      return
    }

    setIsSubmitting(true)
    try {
      const submissionData = {
        answers: answers.map((answer) => ({
          question: answer.questionId,
          answer: answer.selectedOption,
        })),
      }
      await privateInstance.post(QUIZ.SUBMIT(quizId), submissionData)
      toast.success('Quiz submitted successfully!')
      navigate('/quiz') // Redirect back to the quizzes page
    } catch (error: any) {
      console.error('Failed to submit quiz:', error)
      toast.error(error.response?.data?.message || 'Failed to submit quiz')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-18">
        <Spinner size="size-12" />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-500">No questions found for this quiz</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Answer Quiz</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions.map((question, index) => (
          <div key={question._id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-2">
              {index + 1}- {question.text}
            </h3>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => {
                const optionLabel = String.fromCharCode(65 + optionIndex) // A, B, C, D
                return (
                  <label
                    key={option}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${question._id}`}
                      value={option}
                      checked={
                        answers.find((a) => a.questionId === question._id)
                          ?.selectedOption === option
                      }
                      onChange={() => handleOptionChange(question._id, option)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      {optionLabel}. {option}
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
        </button>
      </div>
    </div>
  )
}
