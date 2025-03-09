"use client"

import { useRouter } from "next/navigation";

const { useRef } = require("react")

const useSearchBar = () => {
    const searchRef = useRef(null);
    const router = useRouter();

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const searchQuery = searchRef.current.value;

        if (searchQuery.trim()) {
            const encodedURI = encodeURIComponent(searchQuery)
            router.push(`/auctions?q=${encodedURI}`)
        }

    }

    return [searchRef, handleSearchSubmit]
};

export default useSearchBar;