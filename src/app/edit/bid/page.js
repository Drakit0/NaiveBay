"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./page.module.css";
import UseNaiveBackAPI from "../../../../hooks/useNaiveBackAPI";
import EditElement from "../../../../components/EditElement/EditElement";

// In this case, auctionStructure is minimal.
const auctionStructure = ["price"];

// All client hook logic is moved into this component.
function PageContent() {
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
        return;
      }
      if (!bidId) {
        // Prepare a new bid element with default auction structure
        setElement(
          Object.fromEntries(auctionStructure.map((field) => [field, ""]))
        );
        return;
      }
      try {
        const response = await get(`/auctions/${id}/bids/${bidId}`);

        if (response) {
          // Remove properties not meant to be edited
          delete response.creation_date;
          delete response.auction;
          delete response.bidder;
          setElement(response);
        }
      } catch (error) {
        console.error("Error fetching element:", error);
        router.push("/");
      }
    };
    getElement();
  }, [id, bidId, get, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert form data to object
      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData);

      let response;
      if (!bidId) {
        response = await post(`/auctions/${id}/bids/`, formObject);
      } else {
        response = await put(`/auctions/${id}/bids/${bidId}/`, formObject);
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

// Wrap PageContent with Suspense to satisfy Next.js requirements.
export default function Page() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <PageContent />
    </Suspense>
  );
}
