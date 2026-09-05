import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../../services/apiAuth"
import toast from "react-hot-toast"

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    const { mutate: updateUserAction, isPending: isUpdating } = useMutation({
        mutationFn: ({ fullName, password, avatar }) => updateUser({ fullName, password, avatar }),
        onSuccess: ({ user }) => {
            //this will update the user query data in sync
            queryClient.setQueryData(["user"], user);
            toast.success("User Updated Successfully");
        },
        onError: () => {
            toast.error("Could not update user at momemt ! Please try later")
        }
    })

    return { updateUserAction, isUpdating }
}