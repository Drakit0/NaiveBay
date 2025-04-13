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
  const { get, post, put } = UseNaiveBackAPI();
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
      // Create a proper FormData object
      const formData = new FormData(e.target);

      // Convert FormData to regular object
      const formObject = Object.fromEntries(formData);

      // Transform category name to category ID if it exists
      if (formObject.category && categoryMap[formObject.category]) {
        formObject.category = categoryMap[formObject.category];
      }

      // POST for new items, PATCH for existing ones
      let response;
      if (!id) {
        response = await post(`/auctions/`, formObject);
      } else {
        response = await put(`/auctions/${id}/`, formObject);
      }

      if (response) {
        alert("Data updated successfully!");
        router.push("/"); // Redirect to home after success
      } else {
        alert("Failed to update data");
      }
    } catch (error) {
      console.error("Unable to update the data:", error);
      alert("Error updating data");
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
