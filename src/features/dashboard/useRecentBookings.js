import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom"
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export const useRecentBookings = () => {
    const [searchparams] = useSearchParams();

    const numDays = !searchparams.get('last') ? 7 : Number(searchparams.get('last'))

    const queryDate = subDays(new Date(), numDays).toISOString();

    const { data: bookings, isLoading } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ["bookings", `last-${numDays}`]
    })

    return { bookings, isLoading, numDays }
}