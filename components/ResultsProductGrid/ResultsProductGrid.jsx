import { Pagination } from "@mui/material";
import DetailedProductCard from "../DetailedProductCard/DetailedProductCard";
import styles from "./styles.module.css";
import { useState } from "react";

// TODO: change this so it works with backend
const ResultsProductGrid = ({ products }) => {
  const productsPerPage = 5;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    // Optionally, scroll to top of results when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsCount}>
        Products found: {products.length}
      </div>
      <div className={styles.resultsGrid}>
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product, index) => (
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
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </div>
      )}
    </div>
  );
};

export default ResultsProductGrid;
