import { useQuery } from "@tanstack/react-query"
import { getStaysTodayActivity } from "../../services/apiBookings"

export const useTodayActivity = () => {
    const { isLoading, data: todayStays } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ["today-activity"]
    })

    return { isLoading, todayStays }
}