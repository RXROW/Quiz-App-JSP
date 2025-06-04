/* eslint-disable react/prop-types */
// @ts-ignore
// @ts-nocheck
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
