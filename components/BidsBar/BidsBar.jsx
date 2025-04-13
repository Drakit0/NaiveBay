import { useState, useEffect } from "react";
import UseNaiveBackAPI from "../../hooks/useNaiveBackAPI";
import styles from "./styles.module.css";
import { CircularProgress, Paper, Avatar } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import BidCard from "../BidCard/BidCard";

const BidsBar = ({ id }) => {
  const { get } = UseNaiveBackAPI();
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const getBids = async () => {
      try {
        const response = await get(`/auctions/${id}/bids`);
        console.log(response);
        if (response && response.results) {
          setBids(response.results);
        } else {
          setBids([]);
        }
      } catch (error) {
        console.error("Error fetching bids:", error);
        setBids([]);
      }
    };

    getBids();
  }, [id, get]);

  return (
    <div className={styles.bidsContainer}>
      <h2 className={styles.bidsTitle}>Bid History</h2>

      {bids.length > 0 ? (
        <div className={styles.bidsList}>
          {bids.map((bid, index) => (
            <BidCard key={`${bid.bidder}-${index}`} bid={bid} auctionID={id} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyBids}>
          <GavelIcon className={styles.emptyIcon} />
          <p>No bids yet. Be the first to place a bid!</p>
        </div>
      )}
    </div>
  );
};

export default BidsBar;
