import DetailedProductCard from "../DetailedProductCard/DetailedProductCard";
import styles from "./styles.module.css";

//TODO: show number of results
const ResultsProductGrid = ({ products }) => {
  return (
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
  );
};

export default ResultsProductGrid;
