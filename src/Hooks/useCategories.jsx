import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategories() {
    function getCategories() {
        const options = {
            method: "GET",
            url: "https://ecommerce.routemisr.com/api/v1/categories",
        };
        return axios.request(options);
    }

    let response = useQuery({
        queryKey: ["Categories"],
        queryFn: getCategories,
        staleTime: 50000,
        gcTime: 10000,
    });
    return response;
}
