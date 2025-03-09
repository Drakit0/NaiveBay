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
      // Manejo de error (mostrar mensaje, redirigir, etc.)
    }
  };

  // 2. Envía los datos actualizados usando updateUserProfile de utils.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const updatedData = await updateUserProfile(accessToken, formData);

      console.log("Datos actualizados:", updatedData);
      alert("Perfil actualizado correctamente");
      // Si quieres, puedes volver a cargar datos o hacer otras acciones
      // fetchUserData();
    } catch (error) {
      console.error("Error al actualizar el perfil de usuario:", error);
      // Manejo de error
    }
  };

  // Maneja los cambios en los inputs
  const handleChange = (e) => {
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
          <label>Nombre de usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Correo</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Otros campos que uses en tu perfil/registro */}

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default UserDetail;
