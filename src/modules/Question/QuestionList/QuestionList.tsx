// @ts-ignore
// @ts-nocheck
// import { FaEdit, FaEye, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
// import useModal from "../../../hook/useModal";
// import AddUpdateModal from "../../Shared/Add-Update-Modal/AddUpdateModal";
// import {
//   useDeleteQuestionMutation,
//   useGetQuestionsQuery,
// } from "../../../Store/ApiStore/Api";

// import { useDispatch, useSelector } from "react-redux";
// import {
//   EditingQuestionId,
//   RemoveQuestionId,
// } from "../../../Store/QuestionSlice/QuestionSlice";
// import ViewModal from "../../Shared/ViewModal/ViewModal";
// import QuestionView from "../QuestionView/QuestionView";
// import QuestionData from "../QuestionData/QuestionData";
// import DeleteModal from '../../Shared/DeleteModal/DeleteModal'

// import { toast } from "react-toastify";
// import Spinner from "../../../ui/Spinner";

// interface Question {
//   _id: string
//   title: string
//   description: string
//   difficulty: string
//   type: string
// }

// // Define interface for the Redux state (QuestionSlice)
// interface QuestionState {
//   Question: {
//     QuestionId: string | null
//   }
// }
// export default function QuestionList() {
//   const { data, isLoading, isError } = useGetQuestionsQuery()
//   const QuestionId = useSelector(
//     (state: QuestionState) => state.Question.QuestionId
//   )
//   const Questions: Question[] | undefined = data?.slice(0, 10)
//   const { isOpen, closeModal, openModal } = useModal()
//   const [deleteQuestion, { status, reset }] = useDeleteQuestionMutation()
//   const viewQuestion: Question[] | undefined = data?.filter(
//     (item: Question) => item?._id === QuestionId
//   )
//   const dispatch = useDispatch()
//   const handleEditQuestion = (id: string) => {
//     dispatch(EditingQuestionId(id))
//     openModal('AddQuestion')
//   }
//   const handleViewQuestion = (id: string) => {
//     dispatch(EditingQuestionId(id))
//     openModal('ViewQuestion')
//   }
//   const handleFormSuccess = () => {
//     dispatch(RemoveQuestionId())
//     closeModal()
//   };

//   // const handleDeleteQuestion = async (id: string) => {
//   //   await deleteQuestion(id).unwrap();
//   // };


//   const handleViewDelete = (id: string) => {
//     dispatch(EditingQuestionId(id))
//     reset()
//     openModal('DeleteQuestion')
//   }
//   const handleAddNew = () => {
//     dispatch(RemoveQuestionId())
//     openModal('AddQuestion')
//   }
//   return (
//     <>
//       {/* <div>
//         <div className="mb-4 flex items-center justify-between">
//           <h2>Bank Of Question</h2>
//           <button
//             onClick={handleAddNew}
//             className="flex items-center rounded-full border px-4 py-2"
//           >
//             <span className="mr-3 text-2xl">
//               <FaPlusCircle />
//             </span>
//             <span className="text-lg font-bold">Add Question</span>
//           </button>
//         </div>
//         <table className="w-full table-fixed border-separate border-spacing-x-0.5 border-spacing-y-1 rounded">
//           <thead className="table-light">
//             <tr className="bg-black text-white">
//               <th scope="col" className="w-1/4 rounded px-5 py-0">
//                 Title
//               </th>
//               <th scope="col" className="w-1/4 rounded px-5 py-0">
//                 Description
//               </th>
//               <th scope="col" className="w-1/4 rounded px-5 py-0">
//                 Difficulty Level
//               </th>
//               <th scope="col" className="w-1/4 rounded px-5 py-0">
//                 Type
//               </th>
//               <th scope="col" className="w-1/4 rounded px-5 py-0">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {isError && <h3>Something went wrong! Could not get questions</h3>}
//             {isLoading && (
//               <tr>
//                 <td colSpan={5} className="py-8 text-center">
//                   <h1>Loading.......</h1>
//                 </td>
//               </tr>
//             )}
//             {Questions &&
//               Questions.map((ques) => (
//                 <tr key={ques._id} className="border border-gray-300">
//                   <td className="border border-gray-300 px-2 py-1">
//                     {ques.title}
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     {ques.description}
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     {ques.difficulty}
//                   </td>
//                   <td className="border border-gray-300 px-2 py-1">
//                     {ques.type}
//                   </td>
//                   <td className="border border-gray-300 px-2 py-2 flex gap-2 justify-center">
//   <button onClick={() => handleEditQuestion(ques._id)} title="Edit">
//     <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
//   </button>
//   <button onClick={() => handleViewDelete(ques._id)} title="Delete">
//     <FaTrashAlt className="text-red-500 hover:text-red-700 cursor-pointer" />
//   </button>
//   <button onClick={() => handleViewQuestion(ques._id)} title="View">
//     <FaEye className="text-green-500 hover:text-green-700 cursor-pointer" />
//   </button>
// </td>

//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div> */}

//       <div className="overflow-x-auto rounded-lg shadow">
//   <div className="mb-4 flex items-center justify-between px-1.5">
//     <h2 className="text-2xl font-bold">Bank Of Question</h2>
//     <button
//       onClick={handleAddNew}
//       className="flex items-center rounded-full border px-4 py-2 hover:bg-gray-100"
//     >
//       <FaPlusCircle className="mr-2 text-xl text-black" />
//       <span className="text-base font-semibold">Add Question</span>
//     </button>
//   </div>

//   <table className="min-w-full table-fixed divide-y divide-gray-300 text-left text-sm">
//     <thead className="bg-gray-800 text-white">
//       <tr>
//         <th className="w-1/4 px-4 py-3 font-semibold">Title</th>
//         <th className="w-1/4 px-4 py-3 font-semibold">Description</th>
//         <th className="w-1/6 px-4 py-3 font-semibold">Difficulty</th>
//         <th className="w-1/6 px-4 py-3 font-semibold">Type</th>
//         <th className="w-1/6 px-4 py-3 font-semibold text-center">Actions</th>
//       </tr>
//     </thead>
//     {/* <tbody className="divide-y divide-gray-200 bg-white">
//       {isError && (
//         <tr>
//           <td colSpan={5} className="px-4 py-4 text-center text-red-500">
//             Something went wrong! Could not get questions
//           </td>
//         </tr>
//       )}
//       {isLoading && (
//         <tr>
//           <td colSpan={5} className="px-4 py-6 text-center">
//             Loading...
//           </td>
//         </tr>
//       )}
//       {Questions &&
//         Questions.map((ques) => (
//           <tr key={ques._id} className="hover:bg-gray-50">
//             <td className="px-4 py-3 align-top break-words">{ques.title}</td>
//             <td className="px-4 py-3 align-top break-words">{ques.description}</td>
//             <td className="px-4 py-3 text-center">{ques.difficulty}</td>
//             <td className="px-4 py-3 text-center">{ques.type}</td>
//             <td className="px-4 py-3">
//               <div className="flex justify-center items-center gap-4">
//                 <button
//                   onClick={() => handleEditQuestion(ques._id)}
//                   title="Edit"
//                   className="text-blue-600 hover:text-blue-800"
//                 >
//                   <FaEdit />
//                 </button>
//                 <button
//                   onClick={() => handleViewDelete(ques._id)}
//                   title="Delete"
//                   className="text-red-600 hover:text-red-800"
//                 >
//                   <FaTrashAlt />
//                 </button>
//                 <button
//                   onClick={() => handleViewQuestion(ques._id)}
//                   title="View"
//                   className="text-green-600 hover:text-green-800"
//                 >
//                   <FaEye />
//                 </button>
//               </div>
//             </td>
//           </tr>
//         ))}
//     </tbody> */}

//     <tbody className="divide-y divide-gray-200 bg-white">
//   {isError && (
//     <tr>
//       <td colSpan={5} className="px-4 py-4 text-center text-red-500">
//         Something went wrong! Could not get questions
//       </td>
//     </tr>
//   )}
//   {isLoading && (
//     <tr>
//       <td colSpan={5} className="px-4 py-6 text-center">
//         <Spinner size="size-12" />
//       </td>
//     </tr>
//   )}
//   {Questions &&
//     Questions.map((ques) => {
//       const difficultyColor =
//         ques.difficulty.toLowerCase() === "easy"
//           ? "bg-green-100 text-green-800"
//           : ques.difficulty.toLowerCase() === "medium"
//           ? "bg-orange-100 text-orange-800"
//           : "bg-red-100 text-red-800";

//       return (
//         <tr key={ques._id} className="hover:bg-gray-50">
//           <td className="px-4 py-3 align-top break-words">{ques.title}</td>
//           <td className="px-4 py-3 align-top break-words">{ques.description}</td>

//           {/* Difficulty with badge */}
//           <td className="px-4 py-3 ">
//             <span
//               className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${difficultyColor}`}
//             >
//               {ques.difficulty}
//             </span>
//           </td>

//           {/* Type badge or plain */}
//           <td className="px-4 py-3 ">
//             <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
//               {ques.type}
//             </span>
//           </td>

//           {/* Actions */}
//           <td className="px-4 py-3">
//             <div className="flex justify-center items-center gap-4">
//   {/* View Button */}
//   <div className="relative group cursor-pointer">
//     <button
//       onClick={() => handleViewQuestion(ques._id)}
//       className="text-green-600 hover:text-green-800"
//     >
//       <FaEye className="text-2xl cursor-pointer" />
//     </button>
//     <span className="absolute bottom-full mb-2 hidden rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap">
//       View
//     </span>
//   </div>

//   {/* Edit Button */}
//   <div className="relative group cursor-pointer">
//     <button
//       onClick={() => handleEditQuestion(ques._id)}
//       className="text-gray-600 hover:text-gray-800"
//     >
//       <FaEdit className="text-2xl cursor-pointer" />
//     </button>
//     <span className="absolute bottom-full mb-2 hidden rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap">
//       Edit
//     </span>
//   </div>

//   {/* Delete Button */}
//   <div className="relative group cursor-pointer">
//     <button
//       onClick={() => handleViewDelete(ques._id)}
//       className="text-red-600 hover:text-red-800"
//     >
//       <FaTrashAlt className="text-2xl cursor-pointer" />
//     </button>
//     <span className="absolute bottom-full mb-2 hidden rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap">
//       Delete
//     </span>
//   </div>
// </div>

//           </td>
//         </tr>
//       );
//     })}
// </tbody>

//   </table>
// </div>

//       {isOpen("AddQuestion") && (

//         <AddUpdateModal
//           closeModal={closeModal}
//           header={QuestionId ? 'Updata Question' : 'Create Question'}
//           openModal={openModal}
//         >
//           <QuestionData
//             key={QuestionId}
//             onSuccess={handleFormSuccess}
//             id={QuestionId}
//           />
//         </AddUpdateModal>
//       )}


//       {isOpen('DeleteQuestion') && QuestionId && (
//         <DeleteModal
//           isOpen={openModal}
//           onClose={closeModal}
//           onConfirm={() => handleDeleteQuestion(QuestionId)}
//           status={status}
//         />
//       )}

//       {isOpen("ViewQuestion") && (

//         <ViewModal
//           isOpen={openModal}
//           onClose={closeModal}
//           title="Question Details"
//         >
//           <QuestionView Question={viewQuestion[0]} key={viewQuestion[0]._id} />
//         </ViewModal>
//       )}
//     </>
//   )
// }

/**///////////////////// */

/* eslint-disable no-unused-vars */
import { FaEdit, FaEye, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import useModal from "../../../hook/useModal";
import AddUpdateModal from "../../Shared/Add-Update-Modal/AddUpdateModal";
import {
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
} from "../../../Store/ApiStore/Api";
// import DeleteConfirmation from "../../Shared/DelecteConfirmation/DelecteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import {
  EditingQuestionId,
  RemoveQuestionId,
} from "../../../Store/QuestionSlice/QuestionSlice";
import ViewModal from "../../Shared/ViewModal/ViewModal";
import QuestionView from "../QuestionView/QuestionView";
import QuestionData from "../QuestionData/QuestionData";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";
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
  // const handleDeleteQuestion = async (id: string) => {
  //   await deleteQuestion(id).unwrap();
  // };
  const handleDeleteQuestion = async (id: string) => {
  try {
    await deleteQuestion(id).unwrap();
    toast.success("Question deleted successfully");
    closeModal();
    dispatch(RemoveQuestionId());
  } catch (error) {
    toast.error("Failed to delete question");
    console.error("Delete failed", error);
  }
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
      {/* <div>
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
                  <td className="border border-gray-300 px-2 py-2 flex gap-2 justify-center">
  <button onClick={() => handleEditQuestion(ques._id)} title="Edit">
    <FaEdit className="text-blue-500 hover:text-blue-700 cursor-pointer" />
  </button>
  <button onClick={() => handleViewDelete(ques._id)} title="Delete">
    <FaTrashAlt className="text-red-500 hover:text-red-700 cursor-pointer" />
  </button>
  <button onClick={() => handleViewQuestion(ques._id)} title="View">
    <FaEye className="text-green-500 hover:text-green-700 cursor-pointer" />
  </button>
</td>

                </tr>
              ))}
          </tbody>
        </table>
      </div> */}

      <div className="overflow-x-auto rounded-lg shadow">
  <div className="mb-4 flex items-center justify-between px-1.5">
    <h2 className="text-2xl font-bold">Bank Of Question</h2>
    <button
      onClick={handleAddNew}
      className="flex items-center rounded-full border px-4 py-2 hover:bg-gray-100"
    >
      <FaPlusCircle className="mr-2 text-xl text-black" />
      <span className="text-base font-semibold">Add Question</span>
    </button>
  </div>

  <table className="min-w-full table-fixed divide-y divide-gray-300 text-left text-sm">
    <thead className="bg-gray-800 text-white">
      <tr>
        <th className="w-1/4 px-4 py-3 font-semibold">Title</th>
        <th className="w-1/4 px-4 py-3 font-semibold">Description</th>
        <th className="w-1/6 px-4 py-3 font-semibold">Difficulty</th>
        <th className="w-1/6 px-4 py-3 font-semibold">Type</th>
        <th className="w-1/6 px-4 py-3 font-semibold text-center">Actions</th>
      </tr>
    </thead>
    {/* <tbody className="divide-y divide-gray-200 bg-white">
      {isError && (
        <tr>
          <td colSpan={5} className="px-4 py-4 text-center text-red-500">
            Something went wrong! Could not get questions
          </td>
        </tr>
      )}
      {isLoading && (
        <tr>
          <td colSpan={5} className="px-4 py-6 text-center">
            Loading...
          </td>
        </tr>
      )}
      {Questions &&
        Questions.map((ques) => (
          <tr key={ques._id} className="hover:bg-gray-50">
            <td className="px-4 py-3 align-top break-words">{ques.title}</td>
            <td className="px-4 py-3 align-top break-words">{ques.description}</td>
            <td className="px-4 py-3 text-center">{ques.difficulty}</td>
            <td className="px-4 py-3 text-center">{ques.type}</td>
            <td className="px-4 py-3">
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => handleEditQuestion(ques._id)}
                  title="Edit"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleViewDelete(ques._id)}
                  title="Delete"
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrashAlt />
                </button>
                <button
                  onClick={() => handleViewQuestion(ques._id)}
                  title="View"
                  className="text-green-600 hover:text-green-800"
                >
                  <FaEye />
                </button>
              </div>
            </td>
          </tr>
        ))}
    </tbody> */}
    <tbody className="divide-y divide-gray-200 bg-white">
  {isError && (
    <tr>
      <td colSpan={5} className="px-4 py-4 text-center text-red-500">
        Something went wrong! Could not get questions
      </td>
    </tr>
  )}
  {isLoading && (
    <tr>
      <td colSpan={5} className="px-4 py-6 text-center">
        Loading...
      </td>
    </tr>
  )}
  {Questions &&
    Questions.map((ques) => {
      const difficultyColor =
        ques.difficulty.toLowerCase() === "easy"
          ? "bg-green-100 text-green-800"
          : ques.difficulty.toLowerCase() === "medium"
          ? "bg-orange-100 text-orange-800"
          : "bg-red-100 text-red-800";

      return (
        <tr key={ques._id} className="hover:bg-gray-50">
          <td className="px-4 py-3 align-top break-words">{ques.title}</td>
          <td className="px-4 py-3 align-top break-words">{ques.description}</td>

          {/* Difficulty with badge */}
          <td className="px-4 py-3 ">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${difficultyColor}`}
            >
              {ques.difficulty}
            </span>
          </td>

          {/* Type badge or plain */}
          <td className="px-4 py-3 ">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
              {ques.type}
            </span>
          </td>

          {/* Actions */}
          <td className="px-4 py-3">
            <div className="flex justify-center items-center gap-4">
  {/* View Button */}
  <div className="relative group cursor-pointer">
    <button
      onClick={() => handleViewQuestion(ques._id)}
      className="text-green-600 hover:text-green-800"
    >
      <FaEye className="text-2xl cursor-pointer" />
    </button>
    <span className="absolute bottom-full mb-2 hidden rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap">
      View
    </span>
  </div>

  {/* Edit Button */}
  <div className="relative group cursor-pointer">
    <button
      onClick={() => handleEditQuestion(ques._id)}
      className="text-gray-600 hover:text-gray-800"
    >
      <FaEdit className="text-2xl cursor-pointer" />
    </button>
    <span className="absolute bottom-full mb-2 hidden rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap">
      Edit
    </span>
  </div>

  {/* Delete Button */}
  <div className="relative group cursor-pointer">
    <button
      onClick={() => handleViewDelete(ques._id)}
      className="text-red-600 hover:text-red-800"
    >
      <FaTrashAlt className="text-2xl cursor-pointer" />
    </button>
    <span className="absolute bottom-full mb-2 hidden rounded bg-gray-800 px-2 py-1 text-xs text-white group-hover:block whitespace-nowrap">
      Delete
    </span>
  </div>
</div>

          </td>
        </tr>
      );
    })}
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

      {isOpen("DeleteQuestion") && QuestionId && (
  <DeleteConfirmation
    isOpen={true}
    title="Delete Question"
    message={`Are you sure you want to delete the question "${viewQuestion[0]?.title}"?`}
    onConfirm={() => handleDeleteQuestion(QuestionId)}
    onCancel={closeModal}
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