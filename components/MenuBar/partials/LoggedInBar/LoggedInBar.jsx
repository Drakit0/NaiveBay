import { Typography } from "@mui/material";
// import styles from "./styles.module.css"

const LoggedInBar = ({ username }) => {
  <>
    <Typography variant="h1">{username}</Typography>
    <Image src="/icons/user_icon.png" href="/user" />
  </>;
};

export default LoggedInBar;
