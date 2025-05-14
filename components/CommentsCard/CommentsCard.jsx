import { useEffect, useState } from "react";
import UseNaiveBackAPI from "../../hooks/useNaiveBackAPI";
import styles from "./styles.module.css";
import { formatDate, checkIfUserIsStaff } from "./utils.js";
import { Avatar, Paper } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CommentCard = ({ comment, auctionID }) => {
  const { get, del } = UseNaiveBackAPI();
  const [author, setAuthor] = useState(null);
  const [commentDetails, setCommentDetails] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const router = useRouter();
  const currentUsername = localStorage.getItem("username") || "";
  const [isStaff, setIsStaff] = useState(null);

  useEffect(() => {
    const fetchIsStaff = async () => {
      try {
        const result = await checkIfUserIsStaff(currentUsername, get);
        setIsStaff(result);
        console.log("isStaff", result);
      } catch (err) {
        console.error("Error checking staff status:", err);
      }
    };

    fetchIsStaff();
  }, [currentUsername, get]);

  useEffect(() => {
    // Fetch comment author
    const fetchAuthor = async () => {
      try {
        const res = await get(`/users/${comment.user}`);
        console.log("Individual user", res);
        if (res) setAuthor(res);
      } catch (err) {
        console.error("Error fetching comment author:", err);
      }
    };

    // Fetch detailed comment
    const fetchComment = async () => {
      try {
        const res = await get(
          `/auctions/${auctionID}/comments/${comment.id}`
        );
        if (res) setCommentDetails(res);
      } catch (err) {
        console.error("Error fetching comment details:", err);
      }
    };

    // Fetch current user data to check admin status
    // const fetchCurrentUser = async () => {
    //   if (!currentUsername) return;
    //   try {
    //     const res = await get(`/users/${currentUsername}`);
    //     if (res) setCurrentUserData(res);
    //   } catch (err) {
    //     console.error("Error fetching current user data:", err);
    //   }
    // };

    fetchAuthor();
    fetchComment();
    // fetchCurrentUser();
  }, [auctionID, comment.id, comment.user, currentUsername, get]);

  const canModify =
    (currentUsername === author?.username || isStaff);

  // if (canModify) {
  //   console.log("User can modify:", currentUserData);
  // } 
  const deleteComment = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if ( confirm("Are you sure you want to delete this comment?")) {
      try {
        await del(
          `/auctions/${auctionID}/comments/${comment.id}/`
        );
        router.push("/");
      } catch (err) {
        console.error("Error deleting comment:", err);
        alert("An error occurred while deleting the comment");
      }
    }
  };

  // Only allow edit if author or admin
  const editLink =
    canModify
      ? `/edit/comment?auction=${auctionID}&comment=${comment.id}`
      : "#";
  // console.log(author, "PEPE", canModify);

return (
    <Link href={editLink}>
        <Paper elevation={2} className={styles.commentCard}>
            <div className={styles.commentHeader}>
                <Avatar className={styles.commenterAvatar}>
                    {author?.username ? author.username.charAt(0).toUpperCase() : "?"}
                </Avatar>
                <div className={styles.commenterInfo}>
                    <h3>{author?.username || "Anonymous"}</h3>
                    <span className={styles.commentDate}>
                      {/* <div>
                        {formatDate(commentDetails?.creation_date)}<small>(Creation date)</small>
                      </div> */}
                      <div>
                        {formatDate(commentDetails?.edit_date)} <small>(Edit date)</small>
                      </div>
                    </span>
                </div>
                <div className={styles.commentActions}>
                    {canModify ? 
                        <DeleteIcon
                            className={styles.commentIcon}
                            onClick={deleteComment}
                        />
                        : null}
                    <ChatBubbleOutlineIcon className={styles.commentIcon} />
                </div>
            </div>
            <div className={styles.commentContent}>
                {commentDetails?.title && <h4>{commentDetails.title}</h4>}
                <p>{commentDetails?.content}</p>
            </div>
        </Paper>
    </Link>
);
};

export default CommentCard;
