import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";
import Logo from "../../public/Logo";

function NewUsers() {
  return <>
    <Heading as="h4">Create a new user</Heading>
    <SignupForm />
  </>
}

export default NewUsers;
