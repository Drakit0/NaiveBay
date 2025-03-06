const { useRef } = require("react")

const useSearchBar = () => {
    const searchRef = useRef(null);

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const searchQuery = searchRef.current.value;

    }

    return [searchRef, handleSearchSubmit]
}

export default useSearchBar