const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default formatDate;
