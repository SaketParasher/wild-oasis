import { useQuery } from "@tanstack/react-query"
import { getCabins } from "../../services/apiCabins"
import toast from "react-hot-toast"

export const useGetCabins = () => {
    const { isLoading, data: cabins, error } = useQuery({
        queryKey: ['cabins'],
        queryFn: getCabins
    })

    if (error) {
        toast.error("Error while loading cabins");

    }

    return { isLoading, cabins }

}