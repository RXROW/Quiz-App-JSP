/* eslint-disable react/prop-types */
import { useFormContext } from "react-hook-form";

const ReusableForm = ({ onSubmit, children }) => {
  const { handleSubmit } = useFormContext();

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {children}
    </form>
  );
};

export default ReusableForm;
