import Image from "next/image";
import styles from "./styles.module.css";

const DetailedProductCard = ({ product }) => {
  return (
    <div>
      <img src={product.thumbnail} />
      <div className={styles.productInfo}>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>
          <strong>Price: ${product.price}</strong>
        </p>
      </div>
    </div>
  );
};
export default DetailedProductCard;
