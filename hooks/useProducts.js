"use client";

import { useState, useEffect } from "react";
import UseNaiveBackAPI from "./useNaiveBackAPI";

const useProducts = (endpoint, searchParams) => {
  const [products, setProducts] = useState([]);
  const { get } = UseNaiveBackAPI();
  const nPages = 3;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = searchParams
          ? Object.fromEntries(searchParams.entries())
          : {};

        console.log({ params, endpoint });
        for (let i = 0; i < nPages; i++) {
          params.page = i + 1;
          const data = await get(endpoint, params);
          console.log({ data });

          if (data && data.results) {
            setProducts((prevProducts) => [...prevProducts, ...data.results]);
            console.log(`Loaded ${data.results.length} products`);
          }
        }
      } catch (e) {
        console.error(`Error fetching products:`, e);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [endpoint, searchParams, get]);

  return products;
};

export default useProducts;
