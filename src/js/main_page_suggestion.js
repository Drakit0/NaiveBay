fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(res => {
        products = res.products; 
        showSuggestions(products); 
    });

function showSuggestions(products){
    const trending = document.getElementById("main-page__trending");
    const ending = document.getElementById("main-page__ending");
    const firstThree = products.slice(0, 3);
    const nextThree = products.slice(3, 6);

    firstThree.forEach(product => {
        const productHTML = `
            <a href="pages/bidding_page.html?id=${product.id}" class="text__not-link">
                <div class="main-page__product border-on-hover--blue text ">
                    <img class="main-page__product-image" src="${product.thumbnail}" alt="${product.title}">
                    <h3>${product.title}</h3>    
                </div>
            </a>
        `;
        trending.innerHTML += productHTML;
    });
    nextThree.forEach(product => {
        const productHTML = `
            <a href="pages/bidding_page.html?id=${product.id}" class="text__not-link">
                <div class="main-page__product border-on-hover--blue text ">
                    <img class="main-page__product-image" src="${product.thumbnail}" alt="${product.title}">
                    <h3>${product.title}</h3>    
                </div>
            </a>
        `;
        ending.innerHTML += productHTML;
    });
}