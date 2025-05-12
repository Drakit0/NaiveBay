"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UseNaiveBackAPI from "../../../hooks/useNaiveBackAPI";
import Link from "next/link";
import styles from "./page.module.css";
import MainPageTemplate from "../../../components/MainPageTemplate/MainPageTemplate";
import { Rating } from "@mui/material";

export default function MyRatings() {
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState([]);
  const { get } = UseNaiveBackAPI();
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/login?redirect=myratings");
        return;
      }

      const loadUserRatings = async () => {
        try {
          setLoading(true);

          const ratingsResponse = await get(`/users/myRatings/`);
          console.log(ratingsResponse);
          if (ratingsResponse) {
            setRatings(ratingsResponse.results);
          }
        } catch (error) {
          console.error("Error loading ratings:", error);
        } finally {
          setLoading(false);
        }
      };

      loadUserRatings();
    }
  }, [get, router]);

  // Render stars based on rating value
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={i < rating ? styles.starFilled : styles.starEmpty}
        >
          ★
        </span>
      ));
  };

  return (
    <MainPageTemplate>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>My Ratings</h1>
            <Link href="/auctions" className={styles.browseButton}>
              Browse Auctions
            </Link>
          </header>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading your ratings...</p>
            </div>
          ) : ratings.length > 0 ? (
            <div className={styles.ratingsList}>
              {ratings.map((rating, index) => (
                <div
                  key={rating.id || `rating-${rating.auction}-${index}`}
                  className={styles.ratingCard}
                >
                  <div className={styles.ratingImage}>
                    {rating.auction_details?.image_url ? (
                      <img
                        src={rating.auction_details.image_url}
                        alt={rating.auction_details.title || "Auction image"}
                      />
                    ) : (
                      <div className={styles.noImage}>No Image</div>
                    )}
                  </div>
                  <div className={styles.ratingContent}>
                    <p className={styles.ratingTitle}>
                      {rating.auction_title || "Untitled Auction"}
                    </p>
                    <div className={styles.ratingStars}>
                      <Rating defaultValue={rating.rating} readOnly />
                    </div>

                    <div className={styles.auctionInfo}>
                      <p className={styles.auctionCategory}>
                        <span className={styles.label}>Category:</span>
                        <span className={styles.label}>
                          {rating.auction_category || "Uncategorized"}
                        </span>
                      </p>
                      <p className={styles.auctionPrice}>
                        <span className={styles.label}>Final Price:</span>$
                        <span className={styles.label}>
                          {rating.auction_price || "N/A"}
                        </span>
                      </p>
                      <p className={styles.auctionStatus}>
                        <span className={styles.label}>Status:</span>
                        <span
                          className={`${styles.status} ${
                            rating.is_open ? styles.open : styles.closed
                          }`}
                        >
                          {rating.is_open ? "Active" : "Closed"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <svg
                className={styles.emptyIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <h2>No ratings yet</h2>
              <p>You have not rated any auctions yet.</p>
              <Link href="/auctions" className={styles.startButton}>
                Browse Auctions
              </Link>
            </div>
          )}
        </div>
      </main>
    </MainPageTemplate>
  );
}
