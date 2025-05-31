
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import Spinner from '../../../ui/Spinner'
import { QUIZ } from '../../../services/apis/apisUrls'
import { privateInstance } from '../../../services/apis/apisConfig'
import { useEffect, useState } from 'react'
import clsx from 'clsx' // For conditional class names

interface Question {
  _id: string
  title: string
  options: Record<string, string>
}

interface SubmitData {
  answers: Array<{
    question: string
    answer: string
  }>
}

export default function AnswerQuiz() {
  const { quizId } = useParams<{ quizId: string }>()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Question[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting }
  } = useForm()

  // Get current form values to track selected options
  const formValues = watch()

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
      setQuestions(response.data.data.questions)
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

  // const onSubmit = async (formData: Record<string, string>) => {
  //   if (!quizId) {
  //     toast.error('Invalid quiz ID')
  //     return
  //   }

  //   const submissionData: SubmitData = {
  //     answers: Object.entries(formData).map(([questionId, answer]) => ({
  //       question: questionId,
  //       answer
  //     }))
  //   }

  //   try {
  //     const submitQuiz= await privateInstance.post(QUIZ.SUBMIT(quizId), submissionData)
  //     toast.success('Quiz submitted successfully!')
  //     console.log(submitQuiz)
  //     navigate('/quiz')
  //   } catch (error: any) {
  //     console.error('Failed to submit quiz:', error)
  //     toast.error(error.response?.data?.message || 'Failed to submit quiz')
  //   }
  // }

//   const onSubmit = async (formData: Record<string, string>) => {
//   if (!quizId) {
//     toast.error('Invalid quiz ID');
//     return;
//   }

//   const submissionData: SubmitData = {
//     answers: Object.entries(formData).map(([questionId, answer]) => ({
//       question: questionId,
//       answer
//     }))
//   };

//   try {
//     const res = await privateInstance.post(QUIZ.SUBMIT(quizId), submissionData);
//     toast.success('Quiz submitted successfully!');
//     console.log(res)
//     const { score, questions } = res.data.data;
// const total = questions.length;
// navigate('/dashboard/score', { state: { score, total } });



//   } catch (error: any) {
//     console.error('Failed to submit quiz:', error);
//     toast.error(error.response?.data?.message || 'Failed to submit quiz');
//   }
// };

  const onSubmit = async (formData: Record<string, string>) => {
  if (!quizId) {
    toast.error('Invalid quiz ID');
    return;
  }

 const submissionData: SubmitData = {
    answers: Object.entries(formData).map(([questionId, answer]) => ({
      question: questionId,
      answer
    }))
  };

  try {
    const res = await privateInstance.post(QUIZ.SUBMIT(quizId), submissionData);
    toast.success('Quiz submitted successfully!');
 
    console.log(res)
    const { score, questions } = res.data.data;
    
    // Send both score and questions to the Score component
    navigate('/dashboard/score', { state: { score, questions } });

  } catch (error: any) {
    console.error('Failed to submit quiz:', error);
    toast.error(error.response?.data?.message || 'Failed to submit quiz');
  }
};


  const allQuestionsAnswered = questions.every(
    (question) => formValues[question._id]
  )

  if (!quizId) {
    return <div>Error: Quiz ID is missing.</div>
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questions.map((question, index) => (
            <div key={question._id} className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2">
                {index + 1}- {question.title}
              </h3>
              <div className="space-y-2">
                {Object.entries(question.options)
                  .slice(0, 4)
                  .map(([optionKey, optionValue]) => {
                    const isSelected = formValues[question._id] === optionKey
                    return (
                      <label
                        key={optionKey}
                        className={clsx(
                          'flex items-center space-x-2 cursor-pointer p-2 rounded-md transition-colors',
                          {
                            'bg-blue-50 border border-blue-200': isSelected,
                            'hover:bg-gray-50': !isSelected
                          }
                        )}
                      >
                        <input
                          type="radio"
                          value={optionKey}
                          {...register(question._id, {
                            required: 'Please select an answer'
                          })}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="flex-1">
                          {optionKey}. {optionValue}
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
            type="submit"
            disabled={!allQuestionsAnswered || isSubmitting}
            className={clsx(
              'bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors',
              {
                'opacity-50 cursor-not-allowed': !allQuestionsAnswered || isSubmitting
              }
            )}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
          </button>
        </div>
      </form>
    </div>
  )
}