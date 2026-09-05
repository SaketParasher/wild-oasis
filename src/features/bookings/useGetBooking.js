import { useQuery } from "@tanstack/react-query"
import { getBooking } from "../../services/apiBookings"
import { useParams } from 'react-router-dom';
import toast from "react-hot-toast";

export const useGetBooking = () => {
    const { bookingId } = useParams();

    console.log(bookingId);

    const { isLoading, error, data: booking } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: () => getBooking(bookingId)
    })

    if (error) {
        console.error(`Error while fetching booking with id : ${bookingId} : ${error}`);
        toast.error(`Error while fetching booking with id: ${bookingId}`);
    }

    return { isLoading, booking }
}