import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import styles from "./styles.module.css";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";

const CategoryDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Prevent drawer from closing when clicking on text fields
  const handleCategoryFieldClick = (event) => {
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
      </Drawer>
    </>
  );
};

export default CategoryDrawer;
