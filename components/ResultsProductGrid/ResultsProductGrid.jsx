import { Button, CircularProgress, Pagination } from "@mui/material";
import DetailedProductCard from "../DetailedProductCard/DetailedProductCard";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import UseNaiveBackAPI from "../../hooks/useNaiveBackAPI";

// TODO: change this so it works with backend
const ResultsProductGrid = ({ initialData }) => {
  console.log("initialData", { initialData });
  const { get } = UseNaiveBackAPI();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  // Initialize with provided data
  useEffect(() => {
    if (initialData) {
      setProducts(initialData.results || []);
      setPagination({
        count: initialData.count || 0,
        next: initialData.next || null,
        previous: initialData.previous || null,
      });
    }
  }, [initialData]);

  // Function to fetch data from a URL
  const fetchPage = async (url) => {
    if (!url) return;

    setLoading(true);
    try {
      // Extract the path from the full URL - assuming the URL structure contains '/api'
      const path = url.includes("/api") ? url.split("/api")[1] : url;
      const data = await get(path);

      if (data) {
        setProducts(data.results || []);
        setPagination({
          count: data.count || 0,
          next: data.next || null,
          previous: data.previous || null,
        });
      }
    } catch (error) {
      console.error("Error fetching page:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (pagination.next) {
      fetchPage(pagination.next);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (pagination.previous) {
      fetchPage(pagination.previous);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsCount}>
        Products found: {pagination.count}
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <CircularProgress />
        </div>
      ) : (
        <div className={styles.resultsGrid}>
          {products.length > 0 ? (
            products.map((product, index) => (
              <DetailedProductCard
                key={`${product.id}-${index}`}
                product={product}
              />
            ))
          ) : (
            <p className={styles.noResults}>
              No products found matching your filters.
            </p>
          )}
        </div>
      )}

      <div className={styles.pagination}>
        <Button
          variant="contained"
          disabled={!pagination.previous}
          onClick={handlePreviousPage}
          color="primary"
        >
          Previous
        </Button>
        <Button
          variant="contained"
          disabled={!pagination.next}
          onClick={handleNextPage}
          color="primary"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ResultsProductGrid;
