"use client";

import Results from "../../../components/Results/Results";
import { useSearchParams } from "next/navigation";
import useProducts from "../../../hooks/useProducts";

const Auctions = () => {
  const searchParams = useSearchParams();
  const products = useProducts("search", searchParams);

  return <Results initialProducts={products} />;
};

export default Auctions;
