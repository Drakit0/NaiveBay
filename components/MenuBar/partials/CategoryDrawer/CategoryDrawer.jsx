import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import styles from "./styles.module.css";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import UseNaiveBackAPI from "../../../../hooks/useNaiveBackAPI";

const CategoryDrawer = () => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Move localStorage access into useEffect (client-side only)
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsAuthenticated(!!accessToken);
  }, []);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Prevent drawer from closing when clicking on somthing inside it
  // unused for now
  const handleFieldClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <IconButton onClick={toggleDrawer} color="default">
        <DensityMediumIcon className={`${styles.bigOnHover}`} />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        className={styles.drawer}
      >
        <div className={styles.closeButton}>
          <IconButton
            onClick={toggleDrawer}
            className={styles.closeButton}
            color="default"
          >
            <CloseIcon className={`${styles.bigOnHover} `} />
          </IconButton>
        </div>
        {isAuthenticated ? (
          <>
            <Link href="/edit/auction">
              <h3>Create new auction</h3>
            </Link>
            <Link href="/myauctions">
              <h3>See my auctions</h3>
            </Link>
            <Link href="/mybids">
              <h3>See my bids</h3>
            </Link>
            <Link href={"/mycomments"}>
              <h3>See my comments</h3>
            </Link>
            <Link href="/myratings">
              <h3>See my ratings</h3>
            </Link>
          </>
        ) : null}
        <h3>Category 1</h3>
        
      </Drawer>
    </>
  );
};

export default CategoryDrawer;
