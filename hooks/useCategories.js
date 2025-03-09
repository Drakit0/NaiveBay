import { useState, useEffect } from "react";
import useDummyJSONAPI from "./useDummyJSONAPI";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const { get } = useDummyJSONAPI();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await get("category-list");
        if (Array.isArray(data)) {
          setCategories(data);
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
