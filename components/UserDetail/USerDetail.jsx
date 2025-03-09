import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../../src/app/user/utils"; 

const UserDetail = () => {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    locality: "",
    municipality: "",
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const userData = await getUserProfile(accessToken);

      setFormData({
        id: userData.id,
        username: userData.username,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        birth_date: userData.birth_date,
        locality: userData.locality,
        municipality: userData.municipality,
      });
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  const handleSubmit = async (e) => { // Form submit handler
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const updatedData = await updateUserProfile(accessToken, formData);

      console.log("Updated data:", updatedData);
      alert("Data updated successfully!");

    } catch (error) {
      console.error("Uncapable of updating the data:", error);
    }
  };

  const handleChange = (e) => { // Input changes handler
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Birth Date</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Locality</label>
          <input
            type="text"
            name="locality"
            value={formData.locality}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Municipality</label>
          <input
            type="text"
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default UserDetail;
