import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast";

export const useCheckOut = () => {

    const queryClient = useQueryClient();

    const { mutate: updatebookingAction, isPending } = useMutation({
        mutationFn: ({ bookingId }) => updateBooking(bookingId, {
            status: 'checked-out'
        }),
        onSuccess: (data) => {
            toast.success(`Status of Booking id: ${data.id} has been updated to ${data.status}`);
            queryClient.invalidateQueries({ type: 'active' });
        },
        onError: () => {
            toast.error(`Error while updating the booking`)
        }
    })

    return { updatebookingAction, isPending }
}