const searchParams = new URLSearchParams(location.search);
const query = searchParams.get("query");
const items = fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(res => setTimeout(() => {
        const resultsList = document.getElementById("results-page__results");
        const firstThree = res.products.slice(0,3);
        resultsList.innerHTML += `<h2>Results for "${query}"</h2>`;
        firstThree.forEach(product => {
            const productHTML = `
                <div class="product">
                    <img src="${product.thumbnail}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p><strong>Price: $${product.price}</strong></p>
                </div>
            `;
            resultsList.innerHTML += productHTML;
        });
    }, 1000));


