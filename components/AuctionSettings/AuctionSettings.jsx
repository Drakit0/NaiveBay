import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Import menu icon
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { useRouter } from "next/navigation";

const options = ["Edit", "Delete"];

const AuctionSettings = ({ auctionId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (option) => {
    handleClose();
    // Handle the selected option here
    if (option === "Edit" && auctionId) {
      // Redirect to the edit page
      router.push(`/auction/${auctionId}`);
    } else if (option === "Delete" && auctionId) {
      // Handle delete operation (show confirmation dialog, etc.)
      if (confirm("Are you sure you want to delete this auction?")) {
        console.log(`Deleting auction ${auctionId}`);
        // Implement your delete logic here
        // After successful deletion, you might want to redirect
        // router.push('/my-auctions');
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
