import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
    const queryClient = useQueryClient();

    const { mutate: updateSettingAction, isPending: isUpdating } = useMutation({
        mutationFn: updateSetting,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["settings"] })
            toast.success("Setting Updated Successfully :)")
        },
        onError: () => {
            toast.error("Error While updating the settings!")
        }
    })

    return { updateSettingAction, isUpdating }
}