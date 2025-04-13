import styles from "./styles.module.css";
import Link from "next/link";

const DetailedProductCard = ({ product }) => {
  return (
    <Link href={`/detail/${product.id}`} className={styles.link}>
      <div className={styles.productCard}>
        <img src={product.thumbnail} className={styles.thumbnail} />
        <div className={styles.productInfo}>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>
            <strong>Price: ${product.price}</strong>
          </p>
        </div>
      </div>
    </Link>
  );
};
export default DetailedProductCard;
