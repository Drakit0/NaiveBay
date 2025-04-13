"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UseNaiveBackAPI from "../../../hooks/useNaiveBackAPI";
import Link from "next/link";
import styles from "./page.module.css";
import MainPageTemplate from "../../../components/MainPageTemplate/MainPageTemplate";

export default function MyBids() {
  const [loading, setLoading] = useState(true);
  const [bids, setBids] = useState([]);
  const { get } = UseNaiveBackAPI();
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/login?redirect=mybids");
        return;
      }
      const loadUserBids = async () => {
        try {
          setLoading(true);

          const bidsResponse = await get(`/users/myBids/`);
          console.log(bidsResponse);
          if (!bidsResponse || bidsResponse.length === 0) {
            setBids([]);
            setLoading(false);
            return;
          }

          // Sort bids by date (most recent first)

          setBids(bidsResponse);
        } catch (error) {
          console.error("Error loading bids:", error);
        } finally {
          setLoading(false);
        }
      };

      loadUserBids();
    }
  }, [get, router]);

  // Format date to be more user-friendly
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <MainPageTemplate>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>My Bids</h1>
            <Link href="/auctions" className={styles.browseButton}>
              Browse Auctions
            </Link>
          </header>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading your bids...</p>
            </div>
          ) : bids.length > 0 ? (
            <div className={styles.bidsList}>
              {bids.map((bid) => (
                <div key={bid.id} className={styles.bidCard}>
                  <div className={styles.bidImage}>
                    {/* Check if auction_details exists and has image_url */}
                    {bid.auction_details?.image_url ? (
                      <img
                        src={bid.auction_details.image_url}
                        alt={bid.auction_details?.title || "Auction image"}
                      />
                    ) : (
                      <div className={styles.noImage}>No Image</div>
                    )}
                  </div>
                  <div className={styles.bidContent}>
                    <Link
                      href={`/detail/${bid.auction_id || bid.auction}`}
                      className={styles.bidTitle}
                    >
                      {bid.auction_details?.title ||
                        bid.auction_title ||
                        "Untitled Auction"}
                    </Link>
                    <p className={styles.bidPrice}>
                      <span className={styles.label}>Your bid:</span>
                      <span className={styles.amount}>
                        ${bid.price || bid.amount}
                      </span>
                    </p>
                    <p className={styles.bidDate}>
                      <span className={styles.label}>Bid placed on:</span>
                      {formatDate(bid.creation_date)}
                    </p>
                    <div className={styles.auctionInfo}>
                      <p className={styles.auctionStatus}>
                        <span className={styles.label}>Status:</span>
                        <span
                          className={`${styles.status} ${
                            bid.auction_details?.is_open || bid.is_open
                              ? styles.open
                              : styles.closed
                          }`}
                        >
                          {bid.auction_details?.is_open || bid.is_open
                            ? "Active"
                            : "Closed"}
                        </span>
                      </p>
                      {(bid.auction_details?.current_price ||
                        bid.current_price) && (
                        <p className={styles.currentPrice}>
                          <span className={styles.label}>Current price:</span>$
                          {bid.auction_details?.current_price ||
                            bid.current_price}
                        </p>
                      )}
                      {(bid.auction_details?.closing_date ||
                        bid.closing_date) && (
                        <p className={styles.closingDate}>
                          <span className={styles.label}>Closes:</span>
                          {formatDate(
                            bid.auction_details?.closing_date ||
                              bid.closing_date
                          )}
                        </p>
                      )}
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
              <h2>No bids yet</h2>
              <p>You have not placed any bids on auctions yet.</p>
              <Link href="/auctions" className={styles.startBiddingButton}>
                Start Bidding
              </Link>
            </div>
          )}
        </div>
      </main>
    </MainPageTemplate>
  );
}
