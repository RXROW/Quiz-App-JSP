import { useEffect, useState } from "react";
import { BsBank2 } from "react-icons/bs";
import { IoIosAlarm } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store/Store/Store";

import { QUIZ, GROUP } from "../../../services/apis/apisUrls";
import { privateInstance } from "../../../services/apis/apisConfig";
import { CompletedQuizzes } from "./CompletedQuizzes";
import { UpcomingQuizzes } from "./UpcomingQuizzes";
import { SimpleQuizCreationModal } from "./SimpleQuizCreationModal";
import { UpdateQuizModal } from "./UpdateQuizModal";
import { SuccessModal } from "./SuccessModal";
import { Group, Quiz, QuizData } from "../../../interfaces/quizInterfaces";

export default function Quizes() {
  const user = useSelector((state: RootState) => state.auth.user);
  console.log("user", user.role);
  const isInstructor = user?.role === "Instructor";

  const [groups, setGroups] = useState<Group[]>([]);
  const [firstFiveIncoming, setFirstFiveIncoming] = useState<Quiz[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
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
      getFirstFiveIncoming();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuiz?._id) {
      toast.error("No quiz selected for update");
      return;
    }

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await privateInstance.put(QUIZ.UPDATE_QUIZ(selectedQuiz._id), formData);
      toast.success("Quiz Updated Successfully");
      setIsUpdateModalOpen(false);
      resetForm();
      getFirstFiveIncoming();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update quiz");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuizClick = (quiz: Quiz) => {
    if (!quiz) {
      toast.error("Invalid quiz data");
      return;
    }
    setSelectedQuiz(quiz);
    // Pre-fill the form with quiz data
    setFormData({
      title: quiz.title,
      description: quiz.description,
      group: quiz.group,
      questions_number: quiz.questions_number,
      difficulty: quiz.difficulty,
      type: quiz.type,
      schadule: quiz.schadule,
      duration: quiz.duration,
      score_per_question: quiz.score_per_question
    });
  };

  const closeModal = () => {
    setSelectedQuiz(null);
    resetForm();
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
    if (!isInstructor) return;

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

      if (!response.data) {
        console.error("No data received from API");
        toast.error("No data received from server");
        return;
      }

      const quizzes = Array.isArray(response.data) ? response.data : [];
      setFirstFiveIncoming(quizzes);
    } catch (error: any) {
      console.error("Failed to fetch upcoming quizzes:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.message || "Failed to load upcoming quizzes");
      setFirstFiveIncoming([]);
    }
  };

  const getCompletedQuizzes = async () => {
    try {
      console.log("Fetching completed quizzes from:", QUIZ.LAST_FIVE_COMPLETED);
      const response = await privateInstance.get(QUIZ.LAST_FIVE_COMPLETED);
      console.log("Completed Quizzes API Response:", response);

      if (!response.data) {
        console.error("No data received from API");
        toast.error("No data received from server");
        return;
      }

      const quizzes = Array.isArray(response.data) ? response.data : [];
      setCompletedQuizzes(quizzes);
    } catch (error: any) {
      console.error("Failed to fetch completed quizzes:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(error.response?.data?.message || "Failed to load completed quizzes");
      setCompletedQuizzes([]);
    }
  };

  // Add error boundary for API calls
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchPromises = [getFirstFiveIncoming(), getCompletedQuizzes()];

        // Only fetch groups if user is an instructor
        if (isInstructor) {
          fetchPromises.push(getAllGroups());
        }

        await Promise.all(fetchPromises);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        toast.error("Failed to load initial data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isInstructor]); // Add isInstructor as a dependency

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const handleDelete = () => {
    if (selectedQuiz && selectedQuiz._id) {
      setIsDeleteModalOpen(true);
    } else {
      toast.error("Invalid quiz selected");
    }
  };

  const confirmDelete = async () => {
    if (!selectedQuiz || !selectedQuiz._id) {
      toast.error("Invalid quiz selected");
      return;
    }

    try {
      await privateInstance.delete(QUIZ.DELETE_QUIZ(selectedQuiz._id));
      toast.success("Quiz deleted successfully");
      setIsDeleteModalOpen(false);
      closeModal();
      // Refresh the quizzes list
      getFirstFiveIncoming();
    } catch (error: any) {
      console.error("Failed to delete quiz:", error);
      toast.error(error.response?.data?.message || "Failed to delete quiz");
    }
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

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
          {isInstructor && (
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
                to="/dashboard/questions"
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
          )}

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
            <UpcomingQuizzes
              incomingQuiz={firstFiveIncoming}
              onQuizClick={handleQuizClick}
              selectedQuiz={selectedQuiz}
              isDeleteModalOpen={isDeleteModalOpen}
              onDelete={handleDelete}
              onUpdate={() => setIsUpdateModalOpen(true)}
              onCloseModal={closeModal}
              onConfirmDelete={confirmDelete}
              onCancelDelete={cancelDelete}
            />
          )}
        </div>
      </div>

      {isInstructor && (
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
          <UpdateQuizModal
            isOpen={isUpdateModalOpen}
            onClose={() => {
              resetForm();
              setIsUpdateModalOpen(false);
            }}
            isSubmitting={isSubmitting}
            errors={errors}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleUpdate}
            groups={groups}
          />
          <SuccessModal
            isOpen={isSecondModalOpen}
            onClose={() => setIsSecondModalOpen(false)}
            code={code}
            onCopyCode={handleCopyCode}
          />
        </div>
      )}
    </>
  );
}