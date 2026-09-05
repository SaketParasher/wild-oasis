import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom"
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export const useRecentStays = () => {
    const [searchparams] = useSearchParams();

    const numDays = !searchparams.get('last') ? 7 : Number(searchparams.get('last'))

    const queryDate = subDays(new Date(), numDays).toISOString();

    const { data: stays, isLoading } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ["stays", `last-${numDays}`]
    })

    const confirmedStays = stays?.filter(stay => stay.status === 'checked-in' || stay.status === 'checked-out')

    return { stays, isLoading, confirmedStays }
}