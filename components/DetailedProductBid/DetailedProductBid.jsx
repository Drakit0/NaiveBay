"use client";

import styles from "./styles.module.css";

import { useButtonTheme } from "../../components/Contexts/ButtonThemeProvider";
import AuctionSettings from "../AuctionSettings/AuctionSettings";
import Rating from "@mui/material/Rating";
import BidsBar from "../BidsBar/BidsBar";
import CommentsBar from "../CommentsBar/CommentsBar";
import Link from "next/link";
import formatDate from "./utils";
import StarIcon from "@mui/icons-material/Star";
import { Button } from "@mui/material";
import useRatings from "./hooks";
import { use, useEffect, useState } from "react";

const DetailedProductCard = ({ product }) => {
  const buttonTheme = useButtonTheme();
  const accessToken = localStorage.getItem("accessToken");
  console.log("product", product);
  const { rating, getRating, postRating, putRating, delRating } = useRatings(
    product.id
  );
  const [user, SetUser] = useState(null);

  const handleDeleteRating = async () => {
    if (rating) {
      await delRating();
    } else {
      alert("You haven't rated this auction yet");
    }
  };
  const handleRatingChange = async (event, newValue) => {
    event.preventDefault();
    await putRating(newValue);
  };
  useEffect(() => {
    getRating();
  }, [getRating]);

  // Use product info when available
  const title = product?.title || "Khaki Field Murph Auto";
  const description =
    product?.description ||
    "The Khaki Field Murph Auto 38mm is here. One of the science fiction's most famous watches known by fans as 'The Murph' is now housed in a compact 38mm stainless steel case. Featuring ultra-readable black dial, beige vintage-style Super-LumiNova® finished hands and black leather strap, it reflects the key aesthetic codes of its 42mm predecessor. Powered by the H-10 automatic movement boasting an 80-hour power reserve, this Khaki Field Murph Auto will capture the hearts of those who are in love with smaller watches.";
  const currentPrice = product?.price ? `$${product.price}` : "750$";

  const images =
    product?.thumbnail && product.thumbnail.length > 0
      ? [product.thumbnail]
      : [
          "../../public/images/bidding_example_watch/hamilton_1.png",
          "../../public/images/bidding_example_watch/hamilton_2.png",
          "../../public/images/bidding_example_watch/hamilton_3.png",
        ];
  console.log(images);
  const brand = product?.brand || "Hamilton";
  const tags = product?.tags ? product.tags.slice(1, 2) : [];
  const shippingInformation = product?.shippingInformation || "Shipment";

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await get(`/users/${product.auctioneer}`);
      console.log("Individual user", fetchedUser);
      SetUser(fetchedUser);
    };

    fetchUser();
  });

  return (
    <main className={`${styles["bidding-page"]} ${styles.text}`}>
      <div className={styles["images-container"]}>
        <div className={styles["principal-image"]}>
          {/* <div className={styles["carrusel-images"]}>
            {images.map((imgSrc, index) => (
              <img key={index} src={imgSrc} alt={`Product image ${index + 1}`} />
            ))}
          </div> */}

          <img src={images[0]} />
        </div>

        <div className={styles["related-products__container"]}>
          <h2>Related products</h2>
          <div className={styles["related-products__order"]}>
            <div className={styles["related-products__items"]}>
              <img
                src="/images/bidding_example_watch/related_1.png"
                alt="Related product 1"
                className={styles["related-products__items"]}
              />
              <b>Khaki Field Murph Green-400$</b>
            </div>
            <div className={styles["related-products__items"]}>
              <img
                src="/images/bidding_example_watch/related_2.png"
                alt="Related product 2"
                className={styles["related-products__items"]}
              />
              <b>Khaki Field Murph Steel-900$</b>
            </div>
            <div className={styles["related-products__items"]}>
              <img
                src="/images/bidding_example_watch/related_3.png"
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
              src="/images/bidding_example_watch/user_picture.png"
              alt="User"
              className={styles["profile-picture"]}
            />
            <b>{"Anonymous"}</b>
          </div>
          <h1 className={styles["item-name"]} id="item-name">
            {title}
          </h1>
          <AuctionSettings auctionId={product.id} />
        </div>

        <hr className={styles.separator} />
        <div className={styles.ratingContainer}>
          <p>Rate this auction</p>
          <Rating
            onChange={handleRatingChange}
            defaultValue={rating}
            value={rating || null}
          />
          <Button onClick={handleDeleteRating}>Remove</Button>
        </div>

        <div className={styles["bidding-description"]}>
          <ul>
            <li id="current-price">
              <b>Price:</b> {currentPrice}
            </li>
            <li id="bidding-time">
              <b>Closing date:</b>{" "}
              {product?.closing_date ? formatDate(product.closing_date) : ""}
            </li>
            <li className={styles.biddingRating}>
              <b>Rating:</b>
              <StarIcon className={styles.starIcon} />
              <p className={styles.ratingNumber}>
                {product?.avg_rating || "-"}
              </p>
            </li>
          </ul>

          <div className={styles["bidding-buttons__container"]}>
            {" "}
            {/* Change this to a react component */}
            {/* <ThemeProvider theme={buttonTheme}>
                <Button variant="contained" color="error">
                  Bid
                </Button>
                <Button variant="contained" color="primary">
                  Follow bid
                </Button>
              </ThemeProvider> */}
            <Link href={`/edit/bid?auction=${product.id}`}>
              <button className={`${styles.button} ${styles.button__red}`}>
                Bid
              </button>
            </Link>
            <Link href={`/edit/comment?auction=${product.id}`}>
            <button className={`${styles.button} ${styles.button__blue}`}>
              Comment
            </button>
            </Link>
          </div>
        </div>
        {accessToken ? (
          <BidsBar id={product.id} />
        ) : (
          <p className={styles["warning-message"]}>
            Only registered users can see bids. Please log in to access this feature.
          </p>
        )}

        <CommentsBar id={product.id} />

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
            <b>Tags:</b>
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
