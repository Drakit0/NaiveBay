import ProductCard from "../ProductCard/ProductCard";
import styles from "./styles.module.css";

const SuggestedProducts = ({ title, products }) => {
  return (
    <div className={styles.auctionList}>
      <h2>{title}</h2>
      <div className={styles.productsContainer}>
        {products.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedProducts;
