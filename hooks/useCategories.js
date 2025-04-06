import { useState, useEffect } from "react";
import useDummyJSONAPI from "./useDummyJSONAPI";
import UseNaiveBackAPI from "./useNaiveBackAPI";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const { get } = UseNaiveBackAPI();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await get("/auctions/categories");
        const categories = data?.results.map((category) => category.name) || [
          "All",
        ];
        if (Array.isArray(categories)) {
          setCategories(categories);
        } else {
          setCategories([]);
          console.log("Categories data is not an array:", data);
        }
      } catch (e) {
        console.log("Error fetching categories:", e);
        setCategories([]);
      }
    };

    fetchCategories();
  }, [get]);

  return categories;
};

export default useCategories;
