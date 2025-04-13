"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./page.module.css";
import UseNaiveBackAPI from "../../../../hooks/useNaiveBackAPI";
import EditElement from "../../../../components/EditElement/EditElement";

const auctionStructure = ["price"];

export default function Page() {
  const params = useSearchParams();
  const id = params.get("auction");
  const bidId = params.get("bid");
  const { get, post, put } = UseNaiveBackAPI();
  const [element, setElement] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getElement = async () => {
      if (!id) {
        router.push("/");
      }
      if (!bidId) {
        setElement(
          Object.fromEntries(auctionStructure.map((field) => [field, ""]))
        );
        return;
      }
      try {
        const response = await get(`/auctions/${id}/bids/${bidId}`);

        if (response) {
          delete response.creation_date;
          delete response.auction;
          delete response.bidder;
          setElement(response);
        }
      } catch {
        console.error("Error fetching element:", error);
        router.push("/");
      }
    };
    getElement();
  }, [id, bidId, get, router]);

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

      // POST for new items, PATCH for existing ones
      let response;
      if (!bidId) {
        response = await post(`/auctions/${id}/bids/`, formObject);
      } else {
        response = await put(`/auctions/${id}/bids/${bidId}/`, formObject);
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
