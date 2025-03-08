import { useState, useEffect } from "react";

const useProductFilter = (initialProducts) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [filterValues, setFilterValues] = useState({
    ordering: "Relevance",
    category: null,
    priceRange: [0, 1000],
  });

  const handleFilterChange = (filterName, value) => {
    // How this works is it takes the earlier state, copies it and overwrites only
    // the attribute that changed
    setFilterValues((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  useEffect(() => {
    console.log({ initialProducts });
    let filteredProducts = [...initialProducts];

    if (filterValues.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filterValues.category
      );
    }

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= filterValues.priceRange[0] &&
        product.price <= filterValues.priceRange[1]
    );

    if (filterValues.ordering === "Ascending") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filterValues.ordering === "Descending") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(filteredProducts);
  }, [filterValues, initialProducts]);

  return {
    products,
    filterValues,
    handleFilterChange,
  };
};

export default useProductFilter;
