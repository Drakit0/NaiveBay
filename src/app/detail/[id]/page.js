"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import DetailedProductBid from "../../../../components/DetailedProductBid/DetailedProductBid";

import styles from "./page.module.css";
import UseNaiveBackAPI from "../../../../hooks/useNaiveBackAPI";

export default function Page() {
  const params = useParams();
  const { id } = params;
  const [product, setProduct] = useState(null);
  const { get } = UseNaiveBackAPI();

  useEffect(() => {
    if (!id) return;
    const productData = async () => {
      const response = await get(`/auctions/${id}`);
      if (response) {
        setProduct(response);
      }
    };
    productData();
  }, [id, get]);

  if (!product) {
    return <div className={styles.loading}>Loading product details...</div>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.mainContent}>
        <DetailedProductBid product={product} />
      </section>
    </main>
  );
}
