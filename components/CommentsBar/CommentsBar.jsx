import { useState, useEffect } from "react";
import UseNaiveBackAPI from "../../hooks/useNaiveBackAPI";
import styles from "./styles.module.css";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CommentCard from "../CommentsCard/CommentsCard";
import { ChatBubbleOutline } from "@mui/icons-material";

const CommentsBar = ({ id }) => {
  const { get } = UseNaiveBackAPI();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await get(`/auctions/${id}/comments`);
        console.log(response);
        if (response && response.results) {
          setComments(response.results);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      }
    };

    getComments();
  }, [id, get]);

  return (
    <div className={styles.commentContainer}>
      <h2 className={styles.commentTitle}>Auction comments</h2>

      {comments.length > 0 ? (
        <div className={styles.commentList}>
          {comments.map((comment, index) => (
            <CommentCard key={`${comment.user}-${index}`} comment={comment} auctionID={id} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyComments}>
          <ChatBubbleOutlineIcon className={styles.emptyIcon} />
          <p>No Comments yet. Be the first to write a comment!</p>
        </div>
      )}
    </div>
  );
};

export default CommentsBar;
