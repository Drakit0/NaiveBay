"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import EditAuction from "../../../../components/EditElement/EditElement";

import styles from "./page.module.css";

export default function Page() {
  const params = useParams();
  const { id } = params;
  // const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [id]);

  // if (!product) {
  //   return <div className={styles.loading}>Loading product details...</div>;
  // }

  if (id === "new") {
    return (
      <main className={styles.main}>
        <section className={styles.mainContent}>
          {/* <EditAuction product={product} /> */}
        </section>
      </main>
    );
  }
  return (
    <main className={styles.main}>
      <section className={styles.mainContent}>
        <EditAuction product={product} />
      </section>
    </main>
  );
}
