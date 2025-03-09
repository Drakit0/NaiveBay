"use client";

import Results from "../../../components/Results/Results";
import {useSearchParams} from "next/navigation";
import useProducts from "../../../hooks/useProducts";
import { Suspense } from "react";

const Auctions = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuctionContent />
    </Suspense>
  );
};

const AuctionContent = () => {
  const searchParams = useSearchParams();
  const products = useProducts("search", searchParams);

  return <Results initialProducts={products} />;
};

export default Auctions;
