"use-client";

import { Description } from "@mui/icons-material";
import styles from "./EditBid.module.css";
import React, {useState, useEffect} from "react";

const EditBid = () => {
    const [formData, setFormData] = useState({
        image:"",
        title: "",
        price: "",
        biddings: "",
        closeBiddings: "",
        origin: "",
        shipment: "",
        tags: [""],
        condition: "",
        Description: "",
    });

    useEffect(() => {
        fetchBidData();
    }, []);

    const fetchBidData = async () => {
        try {
            const accessToken = localStorage.getItem("accessToken");
            const bidData = await getBidProfile(accessToken);
            setFormData({
                image: bidData.image,
                title: bidData.title,
                price: bidData.price,
                biddings: bidData.biddings,
                closeBiddings: bidData.closeBiddings,
                origin: bidData.origin,
                shipment: bidData.shipment,
                tags: bidData.tags,
                condition: bidData.condition,
                Description: bidData.Description,
            });
        } catch (error) {
            console.error("Error fetching bid data:", error);
        }
    };


    return(
        
    )
    
}