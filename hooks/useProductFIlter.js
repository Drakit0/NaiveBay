import { useState, useEffect } from "react";
import UseNaiveBackAPI from "./useNaiveBackAPI";

const useProductFilter = (searchQuery) => {
  const [products, setProducts] = useState([]);
  const search = searchQuery.search || "";
  const category = searchQuery.category || "All";
  const min_price = searchQuery.min_price || 0;
  const max_price = searchQuery.max_price || 1000;
  const { get } = UseNaiveBackAPI();
  const [filterValues, setFilterValues] = useState({
    // ordering: "Relevance",
    category: category,
    priceRange: [min_price, max_price],
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
    let query = {};
    query.search = search;
    if (filterValues.category && filterValues.category !== "All") {
      query.category = filterValues.category;
    }
    console.log(filterValues.priceRange);
    query.min_price = filterValues.priceRange[0];
    query.max_price = filterValues.priceRange[1];
    console.log(query);
    const getProducts = async () => {
      const response = await get("/auctions", query);
      if (!response) {
        setProducts([]);
        return;
      }

      setProducts(response);
    };
    getProducts();
  }, [filterValues, search, get]);

  return {
    products,
    filterValues,
    handleFilterChange,
  };
};

export default useProductFilter;
