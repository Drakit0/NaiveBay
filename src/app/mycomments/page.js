"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UseNaiveBackAPI from "../../../hooks/useNaiveBackAPI";
import Link from "next/link";
import styles from "./page.module.css";
import MainPageTemplate from "../../../components/MainPageTemplate/MainPageTemplate";

export default function MyComments() {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [currentUsername, setCurrentUsername] = useState("");
  const { get } = UseNaiveBackAPI();
  const router = useRouter();

  useEffect(() => {
      // Grab username from localStorage (client-only)
      const savedUsername = typeof window !== "undefined"
       ? window.localStorage.getItem("username") || ""
       : "";
      setCurrentUsername(savedUsername);

      // Check authentication
      const accessToken = window.localStorage.getItem("accessToken");
      if (!accessToken) {
       router.push("/login?redirect=mycomments");
       return;
      }

      const loadUserComments = async () => {
        try {
          setLoading(true);

          const commentsResponse = await get(`/users/myComments/`);
          console.log(commentsResponse);
          if (commentsResponse) {
            setComments(commentsResponse.results);
          }
        } catch (error) {
          console.error("Error loading comments:", error);
        } finally {
          setLoading(false);
        }
      };

      loadUserComments();
    }
  , [get, router]);

  return (
    <MainPageTemplate>
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>My Comments</h1>
            <Link href="/auctions" className={styles.browseButton}>
              Browse Auctions
            </Link>
          </header>

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading your comments...</p>
            </div>
          ) : comments.length > 0 ? (
            <div className={styles.bidsList}>
              {comments.map((comment, index) => (
                <div
                  key={comment.id || `comment-${comment.auction}-${index}`}
                  className={styles.bidCard}
                >
                  <div className={styles.bidImage}>
                    {comment.auction_details?.image_url ? (
                      <img
                        src={comment.auction_details.image_url}
                        alt={comment.auction_details.title || "Auction image"}
                      />
                    ) : (
                      <div className={styles.noImage}>No Image</div>
                    )}
                  </div>
                  <div className={styles.bidContent}>
                    <p className={styles.bidTitle}>
                      {comment.auction_title || "Untitled Auction"}
                    </p>
                    <h4 className={styles.label}>Comment:</h4>
                    <p className={styles.label}>
                      {comment.content || "No comment provided."}
                    </p>

                    <div className={styles.auctionInfo}>
                      <p className={styles.auctionCategory}>
                        <span className={styles.label}>
                          Category:{" "}
                          {comment.auction_category || "Uncategorized"}
                        </span>
                      </p>
                      <p className={styles.auctionPrice}>
                        <span className={styles.label}>
                          Price: ${comment.auction_price || "N/A"}
                        </span>
                      </p>
                      <p className={styles.auctionStatus}>
                        <span className={styles.label}>Status:</span>
                        <span
                          className={`${styles.status} ${
                            comment.is_open ? styles.open : styles.closed
                          }`}
                        >
                          {comment.is_open ? "Active" : "Closed"}
                        </span>
                      </p>
                      <p className={styles.auctionUser}>
                        <span className={styles.label}>
                          User:{" "}
                          {comment.user
                            ? comment.user === currentUsername
                              ? "You"
                              : comment.user
                            : "anonymous"}
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
              <h2>No comments yet</h2>
              <p>You have not commented on any auctions yet.</p>
              <Link href="/auctions" className={styles.startBiddingButton}>
                Browse Auctions
              </Link>
            </div>
          )}
        </div>
      </main>
    </MainPageTemplate>
  );
}
