/* eslint-disable no-unused-vars */
import { FaPlusCircle } from "react-icons/fa";
import useModal from "../../../hook/usemodal";
import AddUpdateModal from "../../Shared/Add-Update-Modal/AddUpdateModal";
import {
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
} from "../../../Store/ApiStore/Api";
import { useDispatch, useSelector } from "react-redux";
import {
  EditingQuestionId,
  RemoveQuestionId,
} from "../../../Store/QuestionSlice/QuestionSlice";
import ViewModal from "../../Shared/ViewModal/ViewModal";
import QuestionView from "../QuestionView/QuestionView";
import QuestionData from "../QuestionData/QuestionData";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
// import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
interface Question {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  type: string;
}

// Define interface for the Redux state (QuestionSlice)
interface QuestionState {
  Question: {
    QuestionId: string | null;
  };
}
export default function QuestionList() {
  const { data, isLoading, isError } = useGetQuestionsQuery();
  const QuestionId = useSelector(
    (state: QuestionState) => state.Question.QuestionId
  );
  const Questions: Question[] | undefined = data?.slice(0, 10);
  const { isOpen, closeModal, openModal } = useModal();
  const [deleteQuestion, { status, reset }] = useDeleteQuestionMutation();
  const viewQuestion: Question[] | undefined = data?.filter(
    (item: Question) => item?._id === QuestionId
  );
  const dispatch = useDispatch();
  const handleEditQuestion = (id: string) => {
    dispatch(EditingQuestionId(id));
    openModal("AddQuestion");
  };
  const handleViewQuestion = (id: string) => {
    dispatch(EditingQuestionId(id));
    openModal("ViewQuestion");
  };
  const handleFormSuccess = () => {
    dispatch(RemoveQuestionId());
    closeModal();
  };
  const handleDeleteQuestion = async (id: string) => {
    await deleteQuestion(id).unwrap();
  };
  const handleViewDelete = (id: string) => {
    dispatch(EditingQuestionId(id));
    reset();
    openModal("DeleteQuestion");
  };
  const handleAddNew = () => {
    dispatch(RemoveQuestionId());
    openModal("AddQuestion");
  };
  return (
    <>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2>Bank Of Question</h2>
          <button
            onClick={handleAddNew}
            className="flex items-center rounded-full border px-4 py-2"
          >
            <span className="mr-3 text-2xl">
              <FaPlusCircle />
            </span>
            <span className="text-lg font-bold">Add Question</span>
          </button>
        </div>
        <table className="w-full table-fixed border-separate border-spacing-x-0.5 border-spacing-y-1 rounded">
          <thead className="table-light">
            <tr className="bg-black text-white">
              <th scope="col" className="w-1/4 rounded px-5 py-0">
                Title
              </th>
              <th scope="col" className="w-1/4 rounded px-5 py-0">
                Description
              </th>
              <th scope="col" className="w-1/4 rounded px-5 py-0">
                Difficulty Level
              </th>
              <th scope="col" className="w-1/4 rounded px-5 py-0">
                Type
              </th>
              <th scope="col" className="w-1/4 rounded px-5 py-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {isError && <h3>Something went wrong! Could not get questions</h3>}
            {isLoading && (
              <tr>
                <td colSpan={5} className="py-8 text-center">
                  <h1>Loading.......</h1>
                </td>
              </tr>
            )}
            {Questions &&
              Questions.map((ques) => (
                <tr key={ques._id} className="border border-gray-300">
                  <td className="border border-gray-300 px-2 py-1">
                    {ques.title}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {ques.description}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {ques.difficulty}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {ques.type}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    <span onClick={() => handleEditQuestion(ques._id)}>
                      Edit
                    </span>
                    <span onClick={() => handleViewDelete(ques._id)}>
                      Delect
                    </span>
                    <span onClick={() => handleViewQuestion(ques._id)}>
                      View
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {isOpen("AddQuestion") && (
        <AddUpdateModal
          closeModal={closeModal}
          header={QuestionId ? "Updata Question" : "Create Question"}
          openModal={openModal}
        >
          <QuestionData
            key={QuestionId}
            onSuccess={handleFormSuccess}
            id={QuestionId}
          />
        </AddUpdateModal>
      )}
      {isOpen("DeleteQuestion") && (
        <DeleteConfirmation
          isOpen={openModal}
          onClose={closeModal}
          onConfirm={() => handleDeleteQuestion(QuestionId)}
          status={status}
        />
      )}
      {isOpen("ViewQuestion") && (
        <ViewModal
          isOpen={openModal}
          onClose={closeModal}
          title="Question Details"
        >
          <QuestionView Question={viewQuestion[0]} key={viewQuestion[0]._id} />
        </ViewModal>
      )}
    </>
  );
}
