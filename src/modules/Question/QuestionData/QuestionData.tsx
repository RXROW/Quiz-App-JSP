import FormInputCrud from "../../Shared/FormInput/FormInputCrud";
import { getValidationRules } from "../../../hook/usevalidations";
import {
  useCreateQuestionMutation,
  useGetQuestionByIdQuery,
  useUpdateQuestionMutation,
} from "../../../Store/ApiStore/Api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
interface QuestionDataProps {
  onSuccess: () => void;
  id: string | null | undefined;
}
// interface QuestionFormData {
//   title: string;
//   description: string;
//   difficulty: string;
//   type: string;
// }
interface QuestionFormData {
  title: string;
  description: string;
  difficulty: string;
  type: string;
  answer: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
}


// export default function QuestionData: React.FC<QuestionDataProps>({ onSuccess, id }) {
// const QuestionData: React.FC<QuestionDataProps> = ({ onSuccess, id }) => {

export default function QuestionData({ onSuccess, id }: QuestionDataProps) {
  const {
    OptionA,
    OptionB,
    OptionC,
    OptionD,
    RightAnswer,
    Title,
    Description,
    type,
    difficulty,
  } = getValidationRules()
  const isEditing = Boolean(id)
  const [createQuestion] = useCreateQuestionMutation()
  const [updateQuestion] = useUpdateQuestionMutation()
  const { data: selectedQuestion } = useGetQuestionByIdQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: !isEditing,
  })
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })
  useEffect(() => {
    if (selectedQuestion) {
      setValue('title', selectedQuestion?.title)
      setValue('description', selectedQuestion?.description)
      setValue('options.A', selectedQuestion?.options?.A)
      setValue('options.B', selectedQuestion?.options?.B)
      setValue('options.C', selectedQuestion?.options?.C)
      setValue('options.D', selectedQuestion?.options?.D)
      setValue('type', selectedQuestion?.type)
      setValue('answer', selectedQuestion?.answer)
      setValue('difficulty', selectedQuestion?.difficulty)
    }
  }, [selectedQuestion, setValue])
  const onSubmit = async (data: QuestionFormData) => {
    try {
      if (isEditing) {
        const response = await updateQuestion({ id, data }).unwrap()
        toast.success(response.message)
      } else {
        const response = await createQuestion(data).unwrap()
        toast.success(response.message)
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      reset()
      if (onSuccess) onSuccess()
    }
  }
  return (
    <div>
      <h3 className="my-4 text-2xl font-medium">Details</h3>
      {/* <form id="modal-form" onSubmit={handleSubmit(onSubmit)}> */}
      <form id="modal-form" onSubmit={handleSubmit(onSubmit)}>

        <div>
          <FormInputCrud
            label="Title"
            name="title"
            register={register}
            rules={Title}
            labelClassName="w-20"
          />
          {errors?.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors?.title?.message}
            </p>
          )}
        </div>
        <div>
          <FormInputCrud
            label="Description"
            name="description"
            register={register}
            rules={Description}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors?.description?.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-2">
          <div>
            <FormInputCrud
              label="A"
              name="options.A"
              register={register}
              rules={OptionA}
              labelClassName="w-20"
            />
            {errors?.options?.A && (
              <p className="mt-1 text-sm text-red-500">
                {errors.options.A.message}
              </p>
            )}
          </div>
          <div>
            <FormInputCrud
              label="B"
              name="options.B"
              register={register}
              rules={OptionB}
              labelClassName="w-20"
            />
            {errors?.options?.B && (
              <p className="mt-1 text-sm text-red-500">
                {errors.options.B.message}
              </p>
            )}
          </div>
          <div>
            <FormInputCrud
              label="C"
              name="options.C"
              register={register}
              rules={OptionC}
              labelClassName="w-20"
            />
            {errors?.options?.C && (
              <p className="mt-1 text-sm text-red-500">
                {errors.options.C.message}
              </p>
            )}
          </div>
          <div>
            <FormInputCrud
              label="D"
              name="options.D"
              register={register}
              rules={OptionD}
              labelClassName="w-20"
            />
            {errors?.options?.D && (
              <p className="mt-1 text-sm text-red-500">
                {errors.options.D.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 max-md:block">
          <div>
            <FormInputCrud
              label="Right Answer"
              name="answer"
              register={register}
              rules={RightAnswer}
            />
            {errors?.answer && (
              <p className="mt-1 text-sm text-red-500">
                {errors?.answer?.message}
              </p>
            )}
          </div>
          <div>
            <FormInputCrud
              label="Category type"
              name="type"
              register={register}
              rules={type}
              placeholderoption="Category"
              type="select"
              options={['FE', 'BE', 'DO']}
            />
            {errors?.type && (
              <p className="mt-1 text-sm text-red-500">
                {errors?.type?.message}
              </p>
            )}
          </div>
          <div>
            <FormInputCrud
              label="Difficulty level"
              name="difficulty"
              register={register}
              rules={difficulty}
              placeholderoption="level"
              type="select"
              options={['easy', 'medium', 'hard']}
            />
            {/* <button type="submit" className="btn-submit">Submit</button> */}

            {errors?.difficulty && (
              <p className="mt-1 text-sm text-red-500">
                {errors?.difficulty?.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
