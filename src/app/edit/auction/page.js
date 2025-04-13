"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import styles from "./page.module.css";
import UseNaiveBackAPI from "../../../../hooks/useNaiveBackAPI";
import EditElement from "../../../../components/EditElement/EditElement";

const auctionStructure = [
  "title",
  "description",
  "price",
  "rating",
  "stock",
  "brand",
  "thumbnail",
  "category",
];

export default function Page() {
  const params = useParams();
  const { id } = params;
  const { get } = UseNaiveBackAPI();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      if (!id) setProduct(auctionStructure.map((el) => ({ el: "" })));
      try {
        const response = await get(`/auctions/${id}`);
        if (response) {
          setProduct(data);
        }
      } catch {
        console.error("Error fetching product:", error);
      }
    };
    getProduct();
  }, [id, get]);

  // if (!product) {
  //   return <div className={styles.loading}>Loading product details...</div>;
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const updatedData = await updateUserProfile(accessToken, formData);
      console.log("Updated data:", updatedData);
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Unable to update the data:", error);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.mainContent}>
        <EditElement product={product} handleSubmit={handleSubmit} />
      </section>
    </main>
  );
}
