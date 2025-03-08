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
        const productData = await get(
          "search",
          Object.fromEntries(searchParams.entries())
        );
        if (productData) {
          setProducts(productData.products);
        }
      } catch (e) {
        console.error("Error fetching product data:", e);
      }
    };
    getProductData();
  }, [searchParams, get]);
  return <Results initialProducts={products} />;
};

export default Auctions;
