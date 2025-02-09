document.getElementById("search-bar").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    if (query){
        const currentPath = location.pathname;
    
        const isInsidePages = currentPath.includes("/pages/");

        const targetPath = isInsidePages ? "" : "pages/";
        
        location.href = `${targetPath}search_results.html?query=${encodeURIComponent(query)}`
    }
})