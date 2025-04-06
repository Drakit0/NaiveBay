import useCategories from "../../hooks/useCategories";

const useFilterConfig = () => {
  const categories = useCategories();
  console.log("Categories in useFilterConfig:", categories);
  return {
    // ordering: {
    //   type: "option",
    //   text: "Order by",
    //   options: ["Relevance", "Ascending", "Descending"],
    // },
    category: {
      type: "option",
      text: "Select Category",
      options: ["All"].concat(categories),
    },
    priceRange: {
      type: "slider",
      text: "Price Range",
      min: 0,
      max: 1000,
    },
  };
};

export default useFilterConfig;
