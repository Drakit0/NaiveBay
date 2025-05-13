import { useEffect, useState } from "react";
import UseNaiveBackAPI from "../../hooks/useNaiveBackAPI";
import styles from "./styles.module.css";
import { formatDate } from "./utils.js";
import { Avatar, Paper } from "@mui/material";
import GavelIcon from "@mui/icons-material/Gavel";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BidCard = ({ bid, auctionID }) => {
  const { get, del } = UseNaiveBackAPI();
  const [user, SetUser] = useState(null);
  const [detailedBid, SetDetailedBid] = useState(null);
  const currentUser = localStorage.getItem("username");
  const router = useRouter();

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
        console.error("Error fetching bid details:", error);
      }
    };

    getUser();
    getBid();
  }, []);

  const deleteBid = async (e) => {
    e.preventDefault(); // Stop the Link from navigating
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this bid?")) {
      console.log(`Deleting bid ${auctionID}`);
      try {
        // Await the async del function
        await del(`/auctions/${auctionID}/bids/${bid.id}/`);

        console.log("Deletion successful");

        // Redirect after successful deletion
        router.push("/");
      } catch (error) {
        console.error("Error deleting bid:", error);
        alert("An error occurred while deleting the bid");
      }
    }
  };

  const bidLink =
    user?.username === currentUser || user?.username
      ? `/edit/bid?auction=${auctionID}&bid=${bid.id}`
      : "#";

    // console.log(user?.username, currentUser, user);

  return (
    <Link href={bidLink}>
      <Paper
        key={`${bid.bidder}-paper`}
        elevation={2}
        className={styles.bidCard}
      >
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
            {(user?.username === currentUser || user?.username) ?
              <DeleteIcon className={styles.bidIcon} onClick={deleteBid} /> :
              null}
            <GavelIcon className={styles.bidIcon} />
            <span>${detailedBid?.price}</span>
          </div>
        </div>
      </Paper>
    </Link>
  );
};

export default BidCard;
