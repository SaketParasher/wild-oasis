import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { RESULTS_PER_PAGE } from "../../utils/constants";

export const useGetAllBookings = () => {

    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient(); // queryClient for prefetching

    // FILTER QUERY to be used in supabse query 
    const filterQuery = searchParams.get("status");
    const filterObject = !filterQuery || filterQuery === 'all' ? null : { key: 'status', value: filterQuery }

    // SORT Query
    const sortBy = searchParams.get('sortBy') || "startDate-desc";
    const [sortFieldName, direction] = sortBy.split("-");

    // PAGINATION
    const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

    const { isLoading, data: { data: bookings, count } = {}, error } = useQuery({
        queryKey: ['bookings', filterQuery, sortBy, page],
        queryFn: () => getAllBookings({
            filter: filterObject,
            sortBy: { field: sortFieldName, direction },
            page
        }),
    })

    // REACT QUERY PREFETCHING, using query client

    const lastPage = Math.ceil(count / RESULTS_PER_PAGE);

    // Pre-fetching next page data only till we are on one page before last page
    if (page < lastPage) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filterQuery, sortBy, page + 1],
            queryFn: () => getAllBookings({
                filter: filterObject,
                sortBy: { field: sortFieldName, direction },
                page: page + 1
            }),
        })
    }

    // if the current page is greater that page 1, then pre-fetch the previous page data
    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ['bookings', filterQuery, sortBy, page - 1],
            queryFn: () => getAllBookings({
                filter: filterObject,
                sortBy: { field: sortFieldName, direction },
                page: page - 1
            }),
        })
    }

    return { isLoading, bookings, count }
}

