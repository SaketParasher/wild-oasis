// this hook is used to delete a cabin using react-query logic

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
    const queryClient = useQueryClient();
    const { isPending: isDeleting, mutate: deleteCabinAction } = useMutation({
        mutationFn: deleteCabin,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cabins'] })
            toast.success("Cabin Deleted Successfully:)")
        },
        onError: () => {
            toast.error("Error in Deleting Cabin!")
        }
    })

    return { isDeleting, deleteCabinAction }
}