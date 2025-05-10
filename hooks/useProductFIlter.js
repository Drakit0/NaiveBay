import { useState, useEffect } from "react";
import UseNaiveBackAPI from "./useNaiveBackAPI";

const useProductFilter = (searchQuery) => {
  const [products, setProducts] = useState([]);
  const search = searchQuery.get("search") || "";
  const category = searchQuery.get("category") || "All";
  const min_price = searchQuery.get("min_price") || 0;
  const max_price = searchQuery.get("max_price") || 2000;
  const min_rating = searchQuery.get("min_rating") || 1;
  const max_rating = searchQuery.get("max_rating") || 5;
  const state = searchQuery.get("state") || "";
  const { get } = UseNaiveBackAPI();
  const [filterValues, setFilterValues] = useState({
    // ordering: "Relevance",
    category: category,
    priceRange: [min_price, max_price],
    ratingRange: [min_rating, max_rating],
    state: state,
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
    query.min_price = filterValues.priceRange[0];
    query.max_price = filterValues.priceRange[1];
    query.min_rating = filterValues.ratingRange[0];
    query.max_rating = filterValues.ratingRange[1];
    if (filterValues.state !== "") {
      query.state = filterValues.state;
    }
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
