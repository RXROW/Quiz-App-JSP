

/**////////////////////////////// */

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Score = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, questions } = location.state || {};

  useEffect(() => {
    if (score === undefined || !questions) {
      navigate('/dashboard');
    }
  }, [score, questions, navigate]);

  // Calculate number of correct answers
  const correctAnswers = questions?.filter((q: any) => q.answer === q.options[q.answer.toUpperCase()]).length || 0;

  const totalQuestions = questions?.length || 0;

  const getMessage = () => {
    const percentage = (correctAnswers / totalQuestions) * 100;
    if (percentage === 100) return 'Excellent! You got all the questions right 🎉';
    if (percentage >= 80) return 'Great job! You’re very close to perfect 🔥';
    if (percentage >= 50) return 'Good effort! But there’s room to improve 👍';
    return 'Keep trying! You can do better next time 💪';
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow text-center">
      <h1 className="text-3xl font-bold mb-4">Quiz Result</h1>
      <p className="text-2xl mb-4">🎯 Final Score: <strong>{score}</strong></p>
      <p className="text-md text-gray-600">{getMessage()}</p>
      <div className='flex justify-center'>
       
        <button
          className="mt-8 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          onClick={() => navigate('/dashboard/results')}
        >
          See Results
        </button>
      </div>
    </div>
  );
};

export default Score;

