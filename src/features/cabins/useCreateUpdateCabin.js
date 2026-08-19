import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertUpdateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateUpdateCabin(isEditMode, cabinId, onMutationComplete, setShowEditForm) {

    const queryClient = useQueryClient();
    const { isPending: isInserting, mutate: createUpdateCabinAction } = useMutation({
        mutationFn: (cabinData) =>
            isEditMode ? insertUpdateCabin(cabinData, cabinId) : insertUpdateCabin(cabinData),
        onSuccess: async () => {
            // reset();
            await queryClient.invalidateQueries({ queryKey: ["cabins"] })
            toast.success(`Cabin ${isEditMode ? 'Edited' : 'Created'} Successfully :)`);
            if (!isEditMode) {
                onMutationComplete();
            } else {
                setShowEditForm(prev => !prev);
            }
        },
        onError: (err) => {
            toast.error(err.message);
        }
    })

    return { isInserting, createUpdateCabinAction }

}