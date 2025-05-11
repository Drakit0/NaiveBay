import { useCallback, useState } from "react";

const { default: UseNaiveBackAPI } = require("../../hooks/useNaiveBackAPI");

const useRatings = (auctionID) => {
  const { get, put, del } = UseNaiveBackAPI();
  const [rating, setRating] = useState(null);
  const id = auctionID;
  const getRating = useCallback(async () => {
    const response = await get(`/auctions/${id}/rating/`);
    setRating(response?.rating ? response.rating : null);
  }, [get, id]);
  const putRating = async (rating) => {
    setRating(rating);
    await put(`/auctions/${id}/rating/`, { rating });
  };
  const delRating = async () => {
    setRating(null);
    await del(`/auctions/${id}/rating/`);
  };
  return {
    rating,
    getRating,
    putRating,
    delRating,
  };
};

export default useRatings;
