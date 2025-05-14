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

export async function checkIfUserIsStaff(username, get) {
  // Check if the user is admin
  const profile = await get(`/users/profile/`);
  if (!profile || typeof profile.id === "undefined") {
    console.error(`No profile found for "${username}"`);
    return false;
  }
  const user = await get(`/users/${profile.id}`);
  console.log("User data:", user);
  if (!user) {
    console.error(`No user data found for ID ${profile.id}`);
    return false;
  }

  return Boolean(user.is_staff);
}
