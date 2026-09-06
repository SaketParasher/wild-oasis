import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Logout } from "../../services/apiAuth"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logoutAction, isPending: isLogingOut } = useMutation({
        mutationFn: Logout,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate('/login', { replace: true })
        },
        onError: () => {
            toast.error("Error while logging out the user")
        }
    })

    return { logoutAction, isLogingOut }
}