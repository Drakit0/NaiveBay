const getFilterConfig = () => {
  return {
    ordering: {
      type: "option",
      text: "Order by",
      options: ["Relevance", "Ascending", "Descending"],
    },
    category: {
      type: "radio",
      text: "Select Category",
      options: ["Smartphones", "Laptops", "Accessories"],
    },
    priceRange: {
      type: "slider",
      text: "Price Range",
      min: 0,
      max: 1000,
    },
  };
};

export default getFilterConfig;
