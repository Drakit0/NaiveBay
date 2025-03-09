import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

const LoggedInBar = ({ username }) => {
  return (
    <>
      <div>
        <Typography variant="h5">{username}</Typography>
      </div>

      <Link href="/user">
        <Image
          src="/icons/user_icon.png"
          width={100}
          height={100}
          alt=""
          className={styles.icon}
        />
      </Link>
    </>
  );
};

export default LoggedInBar;
