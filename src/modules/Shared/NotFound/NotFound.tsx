
import { useNavigate } from 'react-router-dom';
import notfound from '../../../assets/404 error with people holding the numbers-bro.png';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-white">
      <img
        src={notfound}
        alt="404"
        className="w-full max-w-3xl object-contain "
      />
      <button
        onClick={() => navigate('/dashboard')}
        className="px-6 py-3 bg-black hover:bg-blend-color text-white rounded-lg shadow transition"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
