"use client";

import { useState, useEffect } from "react";
import useDummyJSONAPI from "./useDummyJSONAPI";

const useProducts = (endpoint, searchParams) => {
  const [products, setProducts] = useState([]);
  const { get } = useDummyJSONAPI();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = searchParams
          ? Object.fromEntries(searchParams.entries())
          : {};
        if (!params["limit"]) {
          params["limit"] = 0;
        }
        console.log({ params, endpoint });
        const data = await get(endpoint, params);

        if (data && data.products) {
          setProducts(data.products);
          console.log(`Loaded ${data.products.length} products`);
        } else {
          setProducts([]);
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
