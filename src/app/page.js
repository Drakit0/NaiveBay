"use client";

import styles from "./page.module.css";
import MainPageTemplate from "../../components/MainPageTemplate/MainPageTemplate";
import SuggestedProducts from "../../components/SuggestedProducts/SuggestedProducts";
import useProducts from "../../hooks/useProducts";

export default function Home() {
  const products = useProducts("");
  return (
    <>
      <main className={styles.main}>
        <MainPageTemplate>
          <SuggestedProducts title="Trending" products={products.slice(0, 5)} />
          <SuggestedProducts
            title="Ending Soon"
            products={products.slice(5, 10)}
          />
        </MainPageTemplate>
      </main>
    </>
  );
}
