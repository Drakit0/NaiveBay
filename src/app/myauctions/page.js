"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import DetailedProductCard from "../../../components/DetailedProductCard/DetailedProductCard";
import UseNaiveBackAPI from "../../../hooks/useNaiveBackAPI";
import styles from "./page.module.css"; // You'll need to create this CSS file
import Link from "next/link";
import { TemplateContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import MainPageTemplate from "../../../components/MainPageTemplate/MainPageTemplate";

const MyAuctions = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyAuctionsContent />
    </Suspense>
  );
};

const MyAuctionsContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userAuctions, setUserAuctions] = useState([]);
  const [username, setUsername] = useState(null);
  const { get } = UseNaiveBackAPI();
  const router = useRouter();

  useEffect(() => {
    const fetchUserAuctions = async () => {
      try {
        setIsLoading(true);

        const auctionsResponse = await get(`/users/myAuctions/`);
        console.log(auctionsResponse);
        if (auctionsResponse) {
          setUserAuctions(auctionsResponse.results);
        }
      } catch (error) {
        console.error("Error fetching user auctions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    // Get username from localStorage (client-side only)
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        // Redirect to login if user is not authenticated
        router.push("/login");
        return;
      }

      setUsername(storedUsername);
      fetchUserAuctions();
    }
  }, [get, router]);

  return (
    <MainPageTemplate>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.emptyState}>My Auctions</h1>
            <Link href="/edit/auction" className={styles.createButton}>
              Create New Auction
            </Link>
          </div>

          {isLoading ? (
            <div className={styles.loading}>Loading your auctions...</div>
          ) : userAuctions.length > 0 ? (
            <div className={styles.auctionsGrid}>
              {userAuctions.map((auction) => (
                <DetailedProductCard
                  key={auction.id}
                  product={auction}
                  showEditButton={true}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>You have not created any auctions yet.</p>
              <p>Click the Create New Auction button to get started!</p>
            </div>
          )}
        </div>
      </main>
    </MainPageTemplate>
  );
};

export default MyAuctions;
