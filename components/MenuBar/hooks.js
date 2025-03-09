const { useState, useEffect } = require("react");

const useUserData = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUserData(storedUser);
    }
  }, []);
  return [userData, setUserData];
};

export default useUserData;
