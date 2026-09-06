import { useMutation } from "@tanstack/react-query"
import { Signup } from "../../services/apiAuth"
import toast from "react-hot-toast";

export const useSignUp = () => {
    const { mutate: signUpAction, isPending } = useMutation({
        mutationFn: ({ fullName, email, password }) => Signup({ fullName, email, password }),
        onSuccess: (data) => {
            console.log(data);
            toast.success("Signup Success! Please verify your email")
        },
        onError: () => {
            toast.error("Error while Signing Up, Please try later!")
        }
    })

    return { signUpAction, isPending }
}