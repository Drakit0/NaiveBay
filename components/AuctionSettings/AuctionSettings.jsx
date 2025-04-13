import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Import menu icon
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { useRouter } from "next/navigation";
import UseNaiveBackAPI from "../../hooks/useNaiveBackAPI";

const options = ["Edit", "Delete"];

const AuctionSettings = ({ auctionId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { del } = UseNaiveBackAPI();
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = async (option) => {
    handleClose();

    if (option === "Edit" && auctionId) {
      router.push(`/edit/auction?id=${auctionId}`);
    } else if (option === "Delete" && auctionId) {
      if (confirm("Are you sure you want to delete this auction?")) {
        console.log(`Deleting auction ${auctionId}`);
        try {
          // Await the async del function
          await del(`/auctions/${auctionId}/`);

          console.log("Deletion successful");

          // Redirect after successful deletion
          router.push("/");
        } catch (error) {
          console.error("Error deleting auction:", error);
          alert("An error occurred while deleting the auction");
        }
      }
    }
  };

  return (
    <div>
      <IconButton
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option, index) => (
          <MenuItem
            key={`${option}-${index}`}
            // selected={option === "Pyxis"}
            onClick={() => handleMenuItemClick(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default AuctionSettings;
