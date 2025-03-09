import Link from "next/link";
import styles from "./styles.module.css";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/detail/${product.id}`} className={styles.link}>
      <div className={styles.productCard}>
        <img src={product.thumbnail} className={styles.productImage} />
        <h3>{product.title}</h3>
      </div>
    </Link>
  );
};

export default ProductCard;
