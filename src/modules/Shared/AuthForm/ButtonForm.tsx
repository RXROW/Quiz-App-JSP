import { FaCheckCircle, FaSpinner } from "react-icons/fa";
function ButtonForm({
  children,
  isSubmitting,
}: {
  children: React.ReactNode;
  isSubmitting: boolean;
}) {
  console.log(isSubmitting);
  return (
    <button
      type="submit"
      className={`flex w-fit cursor-pointer items-center gap-1 rounded-lg bg-[#F5F5F5] px-6 py-2 text-lg font-medium capitalize text-black hover:bg-gray-200`}
      disabled={isSubmitting}
    >
      {children}
      {isSubmitting && <FaSpinner />}
      {!isSubmitting && <FaCheckCircle />}
    </button>
  );
}

export default ButtonForm;
