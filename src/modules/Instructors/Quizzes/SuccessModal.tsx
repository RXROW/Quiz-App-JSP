import { IoIosCopy } from "react-icons/io";

export const SuccessModal = ({
    isOpen,
    onClose,
    code,
    onCopyCode
}: {
    isOpen: boolean;
    onClose: () => void;
    code: number;
    onCopyCode: () => void;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-md">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-center">Quiz Created Successfully!</h2>
                </div>
                <div className="p-6">
                    <p className="text-center mb-4">Your quiz code:</p>
                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <span className="text-3xl font-bold bg-gray-100 px-4 py-2 rounded">{code}</span>
                        <button
                            onClick={onCopyCode}
                            className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                            title="Copy code"
                        >
                            <IoIosCopy className="text-xl" />
                        </button>
                    </div>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        Share this code with your participants to join the quiz
                    </p>
                </div>
                <div className="p-6 border-t bg-gray-50 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};
