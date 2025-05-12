"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./page.module.css";
import UseNaiveBackAPI from "../../../../hooks/useNaiveBackAPI";
import EditElement from "../../../../components/EditElement/EditElement";
import useCategories from "../../../../hooks/useCategories";

// Define the auction structure fields
const auctionStructure = [
  "title",
  "description",
  "price",
  "rating",
  "stock",
  "brand",
  "thumbnail",
  "image",
  "category",
  "closing_date",
];

// This component contains all logic that uses client-only hooks like useSearchParams.
function PageContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const { get, post, put } = UseNaiveBackAPI();
  const [element, setElement] = useState(null);
  const router = useRouter();
  const { categoryMap } = useCategories();

  useEffect(() => {
    const getElement = async () => {
      if (!id) {
        // If no id, prepare an empty auction element
        setElement(
          Object.fromEntries(auctionStructure.map((field) => [field, ""]))
        );
        return;
      }
      try {
        const response = await get(`/auctions/${id}`);

        if (response) {
          // Remove properties that should not be edited
          delete response.auctioneer;
          delete response.creation_date;
          delete response.isOpen;
          setElement(response);
        }
      } catch (error) {
        console.error("Error fetching element:", error);
        router.push("/");
      }
    };
    getElement();
  }, [id, get, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert form data to an object
      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData);
      console.log("Form data:", formObject);
      if (formObject.thumbnail) {
        delete formObject.image;
      } else if (formObject.image) {
        formObject.thumbnail =
          "https://www.shutterstock.com/search/default-image-icon";
      }

      // Transform category name to category ID if available
      if (formObject.category && categoryMap[formObject.category]) {
        formObject.category = categoryMap[formObject.category];
      }

      let response;
      if (!id) {
        response = await post(`/auctions/`, formObject);
      } else {
        response = await put(`/auctions/${id}/`, formObject);
      }

      if (response) {
        alert("Data updated successfully!");
        router.push("/");
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

// Wrap PageContent in a Suspense boundary for safe CSR usage.
export default function Page() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <PageContent />
    </Suspense>
  );
}
