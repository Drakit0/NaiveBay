// Format date to be more readable
const formatDate = (dateString) => {
  const date = new Date(dateString);
  date.setHours(date.getHours() - 2); 
  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export { formatDate };
