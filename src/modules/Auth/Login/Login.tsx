import { FormInput } from "../../Shared/AuthForm/FormInput";
import ReusableForm from "../../Shared/AuthForm/ReusableForm";
import { FormProvider, useForm } from "react-hook-form";
import ButtonForm from "../../Shared/AuthForm/ButtonForm";
import { toast } from "react-toastify";
import { getValidationRules } from "../../../hook/usevalidations";
import { useLoginMutation } from "../../../Store/ApiStore/Api";
import { LoginData } from "../../../interfaces/authInterfaces";
import { Link, useNavigate } from "react-router";
const Login = () => {
  const { email, password } = getValidationRules();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  console.log(isLoading);
  const onSubmit = async (data: LoginData) => {
    try {
      const response = await login(data).unwrap();
      navigate("/dashboard");
      toast.success(response.message);
    } catch (error) {
      console.log(error);
      toast.error(error.data.message || "Ckeck Your internet");
    }
  };
  return (
    <>
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            label="Registered email address"
            name="email"
            rules={email}
            placeholder="Type Your Email"
            type="email"
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            // rules={password}
            placeholder={"Type Your Password"}
          />
          <div className="flex w-3/4 items-center justify-between text-white">
            <ButtonForm isSubmitting={isLoading}>Sign in</ButtonForm>
            <p>
              ForgetPassword?
              <span className="text-(--color-auth) underline">
                <Link to="/forget-password">click here</Link>
              </span>
            </p>
          </div>
        </ReusableForm>
      </FormProvider>
    </>
  );
};

export default Login;
