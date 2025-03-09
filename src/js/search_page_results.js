const searchParams = new URLSearchParams(location.search);
const query = searchParams.get("query");
let products = []; 

fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(res => {
        products = res.products; 
        displayResults(products, "relevance"); 
    });

const orderingSelect = document.getElementById("ordering-select");
orderingSelect.addEventListener("change", () => {
    const selectedOrder = orderingSelect.value;
    displayResults(products, selectedOrder);
});

function displayResults(products, order) {
    const resultsList = document.getElementById("results-page__results");
    resultsList.innerHTML = `<h2>Results for "${query}"</h2>`;

    
    let sortedProducts = [...products]; 

    if (order === "ascending-price") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "descending-price") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }
    
    const firstThree = sortedProducts.slice(0, 3);

    firstThree.forEach(product => {
        const productHTML = `
            <a href="bidding_page.html?id=${product.id}" class="text__not-link">
                <div class="results-page__product border-on-hover--blue text ">
                    <img class="results-page__product-image" src="${product.thumbnail}" alt="${product.title}">
                    <div class="results-page__product-info">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p><strong>Price: $${product.price}</strong></p>
                    </div>
                </div>
            </a>
        `;
        resultsList.innerHTML += productHTML;
    });
}
