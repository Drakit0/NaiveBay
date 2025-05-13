"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import styles from "./page.module.css";
import UseNaiveBackAPI from "../../../../hooks/useNaiveBackAPI";
import EditElement from "../../../../components/EditElement/EditElement";

const auctionStructure = ["title", "content"];

// All client hook logic is moved into this component.
function PageContent() {
  const params = useSearchParams();
  const auction = params.get("auction");
  const commentId = params.get("comment");
  const { get, post, put } = UseNaiveBackAPI();
  const [element, setElement] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getElement = async () => {

      if (!auction) {
        router.push("/");
        return;
      }
      if (!commentId) {
        // Prepare a new comment element with default auction structure
        setElement(
          Object.fromEntries(auctionStructure.map((field) => [field, ""]))
        );
        return;
      }
      try {
        const response = await get(`/auctions/${auction}/comments/${commentId}/`);
        // console.log("Response from getElement:", response);

        if (response) {
          // Remove properties not meant to be edited
          delete response.creation_date;
          delete response.edit_date;
          delete response.auction;
          delete response.user;
          delete response.id;
          setElement(response);
        }
      } catch (error) {
        router.push("/");
      }
    };
    getElement();
    
  }, [auction, commentId, get, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert form data to object
      const formData = new FormData(e.target);
      const formObject = Object.fromEntries(formData);
      console.log("Form data to submit:", formObject);
      console.log(auction, commentId)
      
      let response;
      if (!commentId) {
        // console.log("Creating new comment");
        response = await post(`/auctions/${auction}/comments/`, formObject);
      } else {
        response = await put(`/auctions/${auction}/comments/${commentId}/`, formObject);
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
