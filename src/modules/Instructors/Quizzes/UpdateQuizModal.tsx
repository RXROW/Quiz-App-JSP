import { Group, QuizData } from "../../../interfaces/quizInterfaces";

interface UpdateQuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    isSubmitting: boolean;
    errors: any;
    formData: QuizData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    groups: Group[];
}

export const UpdateQuizModal = ({
    isOpen,
    onClose,
    isSubmitting,
    errors,
    formData,
    handleChange,
    handleSubmit,
    groups
}: UpdateQuizModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">Update Quiz</h2>
                </div>
                <div className="p-6 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Group</label>
                                <select
                                    name="group"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.group}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a group</option>
                                    {groups.map((group) => (
                                        <option key={group._id} value={group._id}>
                                            {group.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.group && <p className="text-red-500 text-sm mt-1">{errors.group.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                name="description"
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Number of Questions</label>
                                <input
                                    type="number"
                                    name="questions_number"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.questions_number || ''}
                                    onChange={handleChange}
                                />
                                {errors.questions_number && <p className="text-red-500 text-sm mt-1">{errors.questions_number.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Score Per Question</label>
                                <input
                                    type="number"
                                    name="score_per_question"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.score_per_question || ''}
                                    onChange={handleChange}
                                />
                                {errors.score_per_question && <p className="text-red-500 text-sm mt-1">{errors.score_per_question.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Difficulty</label>
                                <select
                                    name="difficulty"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                >
                                    <option value="">Select difficulty</option>
                                    <option value="easy">Easy</option>
                                    <option value="medium">Medium</option>
                                    <option value="hard">Hard</option>
                                </select>
                                {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Type</label>
                                <select
                                    name="type"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    <option value="">Select type</option>
                                    <option value="FE">Frontend</option>
                                    <option value="BE">Backend</option>
                                    <option value="DO">DevOps</option>
                                </select>
                                {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Schedule</label>
                                <input
                                    type="datetime-local"
                                    name="schadule"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.schadule}
                                    onChange={handleChange}
                                />
                                {errors.schadule && <p className="text-red-500 text-sm mt-1">{errors.schadule.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                                <input
                                    type="number"
                                    name="duration"
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.duration || ''}
                                    onChange={handleChange}
                                />
                                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
                            </div>
                        </div>
                    </form>
                </div>
                <div className="p-6 border-t bg-gray-50 flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? "Updating..." : "Update Quiz"}
                    </button>
                </div>
            </div>
        </div>
    );
}; 