"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./page.module.css";
import UseNaiveBackAPI from "../../../../hooks/useNaiveBackAPI";
import EditElement from "../../../../components/EditElement/EditElement";
import useCategories from "../../../../hooks/useCategories";

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
  const params = useSearchParams();
  const id = params.get("id");
  const { get, post } = UseNaiveBackAPI();
  const [element, setElement] = useState(null);
  const router = useRouter();
  const { categoryMap } = useCategories();

  useEffect(() => {
    const getElement = async () => {
      if (!id) {
        setElement(
          Object.fromEntries(auctionStructure.map((field) => [field, ""]))
        );
      }
      try {
        const response = await get(`/auctions/${id}`);

        if (response) {
          delete response.auctioneer;
          delete response.creation_date;
          delete response.isOpen;
          setElement(response);
        }
      } catch {
        console.error("Error fetching element:", error);
        router.push("/");
      }
    };
    getElement();
  }, [id, get, router]);

  // if (!element) {
  //   return <div className={styles.loading}>Loading element details...</div>;
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formInfo = new FormData(e);
      formInfo;
      if (id) {
        post(`/auctions/`, formInfo);
      } else {
        patch(`/auctions/${id}`, formInfo);
      }
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Unable to update the data:", error);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.mainContent}>
        {element ? (
          <EditElement element={element} handleSubmit={handleSubmit} />
        ) : (
          <div>Loading element details...</div>
        )}
      </section>
    </main>
  );
}
