import { useMutation } from "@tanstack/react-query"
import { LoginUser } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

export const useLogin = () => {
    const navigate = useNavigate();

    const { mutate: login, isPending: isLoging } = useMutation({
        mutationFn: ({ email, password }) => LoginUser({ email, password }),
        onSuccess: (data) => {
            console.log(data);
            navigate('/', { replace: true })
        },
        onError: () => {
            toast.error("Email or password is wrong!")
        }
    })

    return { login, isLoging }
}