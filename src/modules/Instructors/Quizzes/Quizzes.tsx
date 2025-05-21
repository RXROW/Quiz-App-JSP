import { useEffect, useState } from "react";
import { BsBank2 } from "react-icons/bs";
import { IoIosAlarm } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { QUIZ, GROUP } from "../../../services/apis/apisUrls";
import { privateInstance } from "../../../services/apis/apisConfig";
import { CompletedQuizzes } from "./CompletedQuizzes";
import { UpcomingQuizzes } from "./UpcomingQuizzes";
import { SimpleQuizCreationModal } from "./SimpleQuizCreationModal";
import { SuccessModal } from "./SuccessModal";
import { Group, Quiz, QuizData } from "../../../interfaces/quizInterfaces";



export default function Quizes() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [firstFiveIncoming, setFirstFiveIncoming] = useState<Quiz[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [code, setCode] = useState<number>(0);

  // Create a form object without react-hook-form since we're removing the dependency
  const [formData, setFormData] = useState<QuizData>({
    title: "",
    description: "",
    group: "",
    questions_number: 0,
    difficulty: "easy",
    type: "FE",
    schadule: "",
    duration: 0,
    score_per_question: 0
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.title) newErrors.title = { message: "Title is required" };
    if (!formData.description) newErrors.description = { message: "Description is required" };
    if (!formData.group) newErrors.group = { message: "Group is required" };
    if (!formData.questions_number || formData.questions_number < 1) {
      newErrors.questions_number = { message: "Must have at least 1 question" };
    }
    if (!formData.difficulty) newErrors.difficulty = { message: "Difficulty is required" };
    if (!formData.type) newErrors.type = { message: "Type is required" };
    if (!formData.schadule) newErrors.schadule = { message: "Schedule is required" };
    if (!formData.duration || formData.duration < 1) {
      newErrors.duration = { message: "Duration must be at least 1 minute" };
    }
    if (!formData.score_per_question || formData.score_per_question < 1) {
      newErrors.score_per_question = { message: "Score must be at least 1" };
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await privateInstance.post(QUIZ.CREATE_QUIZ, formData);
      setCode(response.data.data.code);
      console.log("code " + response.data.data.code)
      toast.success("Quiz Created Successfully");
      setIsModalOpen(false);
      setIsSecondModalOpen(true);
      resetForm();
      window.location.reload(); 
    } catch (error) {
      console.error(error);
      toast.error("Failed to create quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      group: "",
      questions_number: 0,
      difficulty: "easy",
      type: "FE",
      schadule: "",
      duration: 0,
      score_per_question: 0
    });
    setErrors({});
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code.toString())
      .then(() => {
        toast.success("Code copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy code");
      });
  };

  const getAllGroups = async () => {
    try { 
      const response = await privateInstance.get(GROUP.GET_ALL); 
      if (!response.data || !Array.isArray(response.data)) {
        console.error("Invalid groups response format:", response.data);
        toast.error("Invalid response format from groups API");
        return;
      }
      setGroups(response.data);
    } catch (error: any) {
      console.error("Failed to fetch groups:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.message || "Failed to load groups");
    }
  };

  const getFirstFiveIncoming = async () => {
    try {
      console.log("Fetching incoming quizzes from:", QUIZ.FIRST_FIVE_INCOMMING);
      const response = await privateInstance.get(QUIZ.FIRST_FIVE_INCOMMING);
      console.log("Incoming Quizzes API Response:", response);
      if (!response.data || !Array.isArray(response.data)) {
        console.error("Invalid incoming quizzes response format:", response.data);
        toast.error("Invalid response format from incoming quizzes API");
        return;
      }
      setFirstFiveIncoming(response.data);
    } catch (error: any) {
      console.error("Failed to fetch upcoming quizzes:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.message || "Failed to load upcoming quizzes");
    }
  };

  const getCompletedQuizzes = async () => {
    try {
      console.log("Fetching completed quizzes from:", QUIZ.LAST_FIVE_COMPLETED);
      const response = await privateInstance.get(QUIZ.LAST_FIVE_COMPLETED);
      console.log("Completed Quizzes API Response:", response);
      if (!response.data || !Array.isArray(response.data)) {
        console.error("Invalid completed quizzes response format:", response.data);
        toast.error("Invalid response format from completed quizzes API");
        return;
      }
      setCompletedQuizzes(response.data);
    } catch (error: any) {
      console.error("Failed to fetch completed quizzes:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.message || "Failed to load completed quizzes");
    }
  };

  // Add error boundary for API calls
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          getAllGroups(),
          getFirstFiveIncoming(),
          getCompletedQuizzes()
        ]);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load initial data");
      } finally {
        setIsLoading(false);
      }
    }; 

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-2 mb-5">
        <h3 className="font-light text-gray-500">
          <Link to="/dashboard">Dashboard</Link>
          {" / "}
          <Link
            to="/quiz"
            className="font-normal text-gray-900 underline"
          >
            Quizzes
          </Link>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <button
              className="border-2 rounded-lg py-5 hover:bg-slate-900 hover:text-white transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="flex flex-col justify-center items-center gap-y-2">
                <div>
                  <IoIosAlarm className="text-4xl md:text-6xl" />
                </div>
                <div>
                  <span className="font-semibold text-lg">Set up a new quiz</span>
                </div>
              </div>
            </button>
            <Link
              to="questions"
              className="border-2 rounded-lg py-5 hover:bg-slate-900 hover:text-white transition-colors flex flex-col justify-center items-center"
            >
              <div className="flex flex-col justify-center items-center gap-y-2">
                <div>
                  <BsBank2 className="text-4xl md:text-6xl" />
                </div>
                <div>
                  <span className="font-semibold text-lg">Question Bank</span>
                </div>
              </div>
            </Link>
          </div>

          {completedQuizzes.length === 0 ? (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-500">No completed quizzes found</p>
            </div>
          ) : (
            <CompletedQuizzes quizzes={completedQuizzes} />
          )}
        </div>

        <div>
          {firstFiveIncoming.length === 0 ? (
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-500">No upcoming quizzes found</p>
            </div>
          ) : (
            <UpcomingQuizzes incomingQuiz={firstFiveIncoming} />
          )}
        </div>
      </div>

      <div>
        <SimpleQuizCreationModal
          isOpen={isModalOpen}
          onClose={() => {
            resetForm();
            setIsModalOpen(false);
          }}
          isSubmitting={isSubmitting}
          errors={errors}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          groups={groups}
        />
        <SuccessModal
          isOpen={isSecondModalOpen}
          onClose={() => setIsSecondModalOpen(false)}
          code={code}
          onCopyCode={handleCopyCode}
        />
      </div>
    </>
  );
}