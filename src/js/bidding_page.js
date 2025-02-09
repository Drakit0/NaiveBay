document.addEventListener("DOMContentLoaded", () => {
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get("id");

    if(productId) {
        fetch(`https://dummyjson.com/products/${productId}`)
            .then(res => res.json())
            .then(product => {
               
                document.querySelector(".item-name").textContent = product.title;
                document.querySelector(".main-image").setAttribute("src", product.thumbnail);
            
                document.getElementById("item-description__text").textContent = product.description;
                document.getElementById("current-price").innerHTML = `<b>Current bid value:</b> $${product.price}`;
                const categoriesInfo = document.getElementById("categories-info");
                categoriesInfo.innerHTML = `<b>Categories:</b> `;

                product.tags.forEach(tag => {
                    const tagElem = document.createElement("b");
                    tagElem.className = "category";
                    tagElem.textContent = tag;
                    categoriesInfo.appendChild(tagElem);
                });
                
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });
    } else {
        console.error("No product ID provided in URL");
    }
});