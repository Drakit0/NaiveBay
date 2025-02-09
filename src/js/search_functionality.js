document.getElementById("search-bar").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    if (query){
        const baseURL = location.origin;
        location.href = `${baseURL}/src/pages/search_results.html?query=${encodeURIComponent(query)}`
    }
})