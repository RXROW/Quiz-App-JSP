import { Quiz } from "../../../interfaces/quizInterfaces";
import { useState } from "react";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import { QUIZ } from "../../../services/apis/apisUrls";
import { privateInstance } from "../../../services/apis/apisConfig";
import { toast } from "react-toastify";

export const UpcomingQuizzes = ({ incomingQuiz }: { incomingQuiz: Quiz[] }) => {
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleQuizClick = (quiz: Quiz) => {
        setSelectedQuiz(quiz);
    };

    const closeModal = () => {
        setSelectedQuiz(null);
    };

    const handleUpdate = () => {
        if (selectedQuiz) {
            console.log("Update quiz:", selectedQuiz._id);
            // TODO: Implement update logic
            alert(`Update quiz ${selectedQuiz.title}`);
            closeModal();
        }
    };

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
            // You might want to refresh the quizzes list here
            window.location.reload(); // Temporary solution - better to use a callback prop
        } catch (error: any) {
            console.error("Failed to delete quiz:", error);
            toast.error(error.response?.data?.message || "Failed to delete quiz");
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Upcoming Quizzes</h2>
            {incomingQuiz.length === 0 ? (
                <p className="text-gray-500">No upcoming quizzes</p>
            ) : (
                <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead className=" bg-amber-950 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Difficulty
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    Duration
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {incomingQuiz.map((quiz) => (
                                <tr
                                    key={quiz._id}
                                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                                    onClick={() => handleQuizClick(quiz)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full
                                            ${quiz.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                                quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'}`}>
                                            {quiz.difficulty}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{quiz.schadule ? new Date(quiz.schadule).toLocaleDateString() : 'N/A'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-500">{quiz.duration} min</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Quiz Details Modal */}
            {selectedQuiz && (
                <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-gray-900">{selectedQuiz.title}</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Code</h4>
                                <p className="mt-1 text-gray-900 font-mono bg-gray-100 p-2 rounded">{selectedQuiz.code}</p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-500">Description</h4>
                                <p className="mt-1 text-gray-900">{selectedQuiz.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Difficulty</h4>
                                    <span className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded-full
                                        ${selectedQuiz.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                            selectedQuiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'}`}>
                                        {selectedQuiz.difficulty}
                                    </span>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Type</h4>
                                    <p className="mt-1 text-gray-900">{selectedQuiz.type}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Duration</h4>
                                    <p className="mt-1 text-gray-900">{selectedQuiz.duration} minutes</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium text-gray-500">Schedule</h4>
                                    <p className="mt-1 text-gray-900">{selectedQuiz.schadule ? new Date(selectedQuiz.schadule).toLocaleString() : 'N/A'}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    onClick={handleUpdate}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <DeleteConfirmation
                isOpen={isDeleteModalOpen}
                title="Delete Quiz"
                message={`Are you sure you want to delete the quiz "${selectedQuiz?.title}"?`}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );
};