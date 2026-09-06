import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;
  const { isPending, signUpAction } = useSignUp();

  const handleFormSubmit = (data) => {
    console.log(data);
    const { fullName, email, password } = data;
    signUpAction({ fullName, email, password })
  }

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register("fullName", {
          required: "Full Name is required"
        })}
          disabled={isPending} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" {...register("email", {
          required: "Email Name is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Please provide a valid email'
          }

        })}
          disabled={isPending} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" {...register("password", {
          required: "Password is required",
          minLength: {
            value: 8,
            message: 'Password should be at least 8 characters'
          }
        })}
          disabled={isPending} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register("passwordConfirm", {
          required: "Confirm Password is required",
          validate: (value) => value === getValues().password || 'Confirm Password should match password'
        })}
          disabled={isPending} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
