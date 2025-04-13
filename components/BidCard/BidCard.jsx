import { useEffect, useState } from "react";
import UseNaiveBackAPI from "../../hooks/useNaiveBackAPI";
import styles from "./styles.module.css";
import { formatDate } from "./utils.js";
import { Avatar, Paper } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";

const BidCard = ({ bid, auctionID }) => {
  const { get } = UseNaiveBackAPI();
  const [user, SetUser] = useState(null);
  const [detailedBid, SetDetailedBid] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await get(`/users/${bid.bidder}`);
        console.log("Individual user", response);
        if (response) {
          SetUser(response);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    const getBid = async () => {
      try {
        const response = await get(`/auctions/${auctionID}/bids/${bid.id}`);

        if (response) {
          SetDetailedBid(response);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
    getBid();
  }, []);

  return (
    <Paper key={`${bid.bidder}-paper`} elevation={2} className={styles.bidCard}>
      <div key={`${bid.bidder}-div`} className={styles.bidHeader}>
        <Avatar className={styles.bidderAvatar}>
          {user?.username ? user?.username.charAt(0).toUpperCase() : "?"}
        </Avatar>
        <div className={styles.bidderInfo}>
          <h3>{user?.username || "Anonymous"}</h3>
          <span className={styles.bidDate}>
            {formatDate(detailedBid?.creation_date)}
          </span>
        </div>
        <div className={styles.bidAmount}>
          <GavelIcon className={styles.bidIcon} />
          <span>${detailedBid?.price}</span>
        </div>
      </div>
    </Paper>
  );
};

export default BidCard;
