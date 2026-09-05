import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateBooking } from "../../services/apiBookings"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckIn = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: updatebookingAction } = useMutation({
        mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, {
            isPaid: true,
            status: 'checked-in',
            ...breakfast
        }),
        onSuccess: (data) => {
            toast.success(`Status of Booking id: ${data.id} has been updated to ${data.status}`);
            queryClient.invalidateQueries({ type: 'active' });
            navigate('/')
        },
        onError: () => {
            toast.error(`Error while updating the booking`)
        }
    })

    return { updatebookingAction }
}