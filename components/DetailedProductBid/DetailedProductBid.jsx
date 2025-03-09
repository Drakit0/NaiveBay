"use client"; 

import styles from "./styles.module.css";

import {Button} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import {useButtonTheme} from "../../components/Contexts/ButtonThemeProvider";

const DetailedProductCard = ({ product }) => {
  const buttonTheme = useButtonTheme();

  // Use product info when available
  const title = product?.title || "Khaki Field Murph Auto";
  const description = product?.description || "The Khaki Field Murph Auto 38mm is here. One of the science fiction's most famous watches known by fans as 'The Murph' is now housed in a compact 38mm stainless steel case. Featuring ultra-readable black dial, beige vintage-style Super-LumiNova® finished hands and black leather strap, it reflects the key aesthetic codes of its 42mm predecessor. Powered by the H-10 automatic movement boasting an 80-hour power reserve, this Khaki Field Murph Auto will capture the hearts of those who are in love with smaller watches.";
  const currentPrice = product?.price ? `$${product.price}` : "750$";

  const images =
    product?.images && product.images.length > 0
      ? product.images
      : [
          "./../../public/images/bidding_example_watch/hamilton_1.png",
          "../../public/images/bidding_example_watch/hamilton_2.png",
          "../../public/images/bidding_example_watch/hamilton_3.png",
        ];

  const brand = product?.brand || "Hamilton";
  const tags = product?.tags ? product.tags.slice(0, 2) : [];
  const shippingInformation = product?.shippingInformation || "Shipment";

  return (
    <main className={`${styles["bidding-page"]} ${styles.text}`}>
      <div className={styles["images-container"]}>
        <div className={styles["principal-image"]}>
          <div className={styles["carrusel-images"]}>
            {images.map((imgSrc, index) => (
              <img key={index} src={imgSrc} alt={`Product image ${index + 1}`} />
            ))}
          </div>
        </div>

        <div className={styles["related-products__container"]}>
          <hr className={styles.separator} />
          <h2>Related products</h2>
          <div className={styles["related-products__order"]}>
            <div className={styles["related-products__items"]}>
              <img
                src="../../public/images/bidding_example_watch/related_1.png"
                alt="Related product 1"
                className={styles["related-products__items"]}
              />
              <b>Khaki Field Murph Green-400$</b>
            </div>
            <div className={styles["related-products__items"]}>
              <img
                src="../../public/images/bidding_example_watch/related_2.png"
                alt="Related product 2"
                className={styles["related-products__items"]}
              />
              <b>Khaki Field Murph Steel-900$</b>
            </div>
            <div className={styles["related-products__items"]}>
              <img
                src="../../public/images/bidding_example_watch/related_3.png"
                alt="Related product 3"
                className={styles["related-products__items"]}
              />
              <b>Lotus Automatic Black-150$</b>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["bidding-info__container"]}>
        <div className={styles["bidding-title"]}>
          <div className={styles.profile}>
            <img
              src="../../public/images/bidding_example_watch/user_picture.png"
              alt="User"
              className={styles["profile-picture"]}
            />
            <b>Mr. Peanuts</b>
          </div>
          <h1 className={styles["item-name"]} id="item-name">
            {title}
          </h1>
        </div>

        <hr className={styles.separator} />

        <div className={styles["bidding-description"]}>
          <ul>
            <li id="current-price">
              <b>Current bid value:</b> {currentPrice}
            </li>
            <li>
              <b>Current Amount of bids:</b> 12
            </li>
            <li>
              <b>First bidding:</b> 2025/02/05 18:03
            </li>
            <li>
              <b>Time until closing bidding:</b> 0h 15min 12sec
            </li>
          </ul>

          <div className={styles["bidding-buttons__container"]}>
            <ThemeProvider theme={buttonTheme}>
              <Button variant="contained" color="error">
                Bid
              </Button>
              <Button variant="contained" color="primary">
                Follow bid
              </Button>
            </ThemeProvider>
          </div>

        </div>

        <hr className={styles.separator} />

        <div className={styles["item-info"]}>
          <div className={styles["shipment-info"]}>
            <p>
              <b>Origin:</b> Germany
            </p>
            
            <p>
              <b>{shippingInformation}</b>
            </p>
          </div>

          <div className={styles["categories-info"]} id="categories-info">
            <b>Categories:</b>
            <b className={styles.category}>{brand}</b>
            <b className={styles.category}>{tags}</b>
            {product?.tags &&
              product.tags.map((tag, idx) => (
                <b key={idx} className={styles.category}>
                  {tag}
                </b>
              ))}
          </div>

          <div className={styles["item-description"]}>
            <p>
              <b>Condition:</b> New
            </p>
            <p id="item-description__text">
              <b>Description:</b> {description}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailedProductCard;
