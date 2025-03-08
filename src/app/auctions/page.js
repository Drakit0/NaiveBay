"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Results from "../../../components/Results/Results";
import UseDummyJSONAPI from "../../../hooks/useDummyJSONAPI";
import { useSearchParams } from "next/navigation";

const Auctions = () => {
  const searchParams = useSearchParams();
  const { get } = UseDummyJSONAPI();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const params = Object.fromEntries(searchParams.entries());
        params.limit = 0;
        const productData = await get("search", params);
        if (productData) {
          setProducts(productData.products);
        }
        console.log(productData.products.length);
      } catch (e) {
        console.error("Error fetching product data:", e);
      }
    };
    getProductData();
  }, [searchParams, get]);
  return <Results initialProducts={products} />;
};

export default Auctions;
