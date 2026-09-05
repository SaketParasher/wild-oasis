// this hook is used to delete a cabin using react-query logic

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteBooking() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isPending: isDeleting, mutate: deleteBookingAction } = useMutation({
        mutationFn: (bookingId) => deleteBooking(bookingId),
        onSuccess: () => {
            queryClient.invalidateQueries({ type: 'active' })
            toast.success("Booking Deleted Successfully:)")
            navigate('/bookings')
        },
        onError: () => {
            toast.error("Error in Deleting Cabin!")
        }
    })

    return { isDeleting, deleteBookingAction }
}