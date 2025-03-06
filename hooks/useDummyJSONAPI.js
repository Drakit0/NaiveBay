import { useCallback } from "react";



const API_URL = "https://dummyjson.com/products/";

const UseDummyJSONAPI = () => {
    const get = useCallback(async (subdomain, params) => {
        const url = new URL(`${API_URL}${subdomain}`)

        if (params) {
            Object.entries(params).foreach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        };

        const response = await fetch(url);
        const data = await response.json();
        return data;
    }, []);
    return { get };
};

export default UseDummyJSONAPI