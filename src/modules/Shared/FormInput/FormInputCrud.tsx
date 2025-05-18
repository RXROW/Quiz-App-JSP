interface FormInputProps {
  label: string;
  type?: string;
  register: any;
  name: string;
  rules?: any;
  options?: string[];
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  placeholderoption?: string;
}
const FormInputCrud: React.FC<FormInputProps> = ({
  label,
  type = "text",
  register,
  name,
  rules,
  options = [],
  className = "",
  labelClassName = "",
  inputClassName = "",
  placeholderoption = "Select an option",
}) => {
  console.log(options);
  const isSelect = type === "select";
  return (
    <>
      <div
        className={`mb-4 flex ${
          name === "description" ? "" : "h-10"
        } rounded-lg border-2 ${className}`}
      >
        <label
          className={`flex flex-shrink-0 items-center rounded-lg bg-[#FFEDDF] p-3 text-lg font-bold sm:text-lg ${labelClassName}`}
        >
          {label}
        </label>
        {isSelect ? (
          <select
            className={`block w-full rounded-r-lg border-0 p-0 pl-3 outline-0 ${inputClassName}`}
            {...register(name, rules)}
          >
            <option value="">{placeholderoption}</option>
            {options.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-white text-black"
              >
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            className={`block w-full rounded-r-lg border-0 p-2.5 outline-0 ${inputClassName}`}
            {...register(name, rules)}
          />
        )}
      </div>
    </>
  );
};

export default FormInputCrud;
