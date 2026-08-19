import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useGetSettings() {
    const { data: settings, error, isLoading } = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    })

    return { isLoading, error, settings }
}