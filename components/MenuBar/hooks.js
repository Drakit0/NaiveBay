const { useState, useEffect } = require("react");


const useUserData = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);
    return [userData, setUserData];
}

export default useUserData;