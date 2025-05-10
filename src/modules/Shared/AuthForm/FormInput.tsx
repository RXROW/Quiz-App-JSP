import { useFormContext } from "react-hook-form";
import { FaKey, FaMailBulk, FaIdCard } from "react-icons/fa";
export const FormInput = ({
  name,
  label,
  type,
  rules,
  placeholder,
}: {
  name: string;
  label: string;
  type: string;
  rules: any;
  placeholder: string;
}) => {
  function getIcon() {
    switch (type) {
      case "email":
        return <FaMailBulk />;
      case "password":
        return <FaKey />;
      case "text":
        return <FaIdCard />;
    }
  }

  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-white"
        >
          {label}
        </label>
        <div className="flex w-3/4 items-center justify-start rounded-lg border border-white bg-black p-2.5">
          <span className="text-2xl mr-2 text-white">{getIcon()}</span>
          <input
            type={type}
            placeholder={placeholder}
            className="outline-none autofill:bg-transparent w-full border-0 bg-transparent py-0 text-sm text-white placeholder:text-gray-600"
            {...register(name, rules)}
          />
        </div>
        {errors[name] && (
          <span className="text-red-700">
            {errors[name]?.message?.toString()}
          </span>
        )}
      </div>
    </>
  );
};
