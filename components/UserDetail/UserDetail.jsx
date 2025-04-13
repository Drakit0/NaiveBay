"use client";

import useProfileData from "@/app/user/hooks";
import styles from "./UserDetail.module.css";
import React, { useState, useEffect } from "react";
import UseNaiveBackAPI from "../../hooks/useNaiveBackAPI";

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
  const { getUserProfile, updateUserProfile } = useProfileData();
  const { post, logout } = UseNaiveBackAPI();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const userData = await getUserProfile(accessToken);
      setFormData({
        id: userData?.id || "",
        username: userData?.username || "",
        email: userData?.email || "",
        first_name: userData?.first_name || "",
        last_name: userData?.last_name || "",
        birth_date: userData?.birth_date || "",
        locality: userData?.locality || "",
        municipality: userData?.municipality || "",
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const updatedData = await updateUserProfile(formData);
      console.log("Updated data:", updatedData);
    } catch (error) {
      console.error("Unable to update the data:", error);
    }
  };
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const currentPassword = e.target.current.value;
    const newPassword = e.target.new.value;
    if (currentPassword === newPassword) {
      alert("New password cannot be the same as the current password.");
      return;
    }

    try {
      const response = await post(`/users/change-password/`, {
        old_password: currentPassword,
        new_password: newPassword,
      });

      if (!response) {
        alert("Unable to change password");
        return;
      }

      alert("Password changed successfully!");
      return;
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };
  const handleLogout = () => {
    logout();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles["user-details-container"]}>
      <div className={styles["user-details-box"]}>
        <h2 className={styles["user-details-title"]}>Captain's details</h2>
        <form className={styles["form-structure"]} onSubmit={handleSubmit}>
          <div className={styles["form-row"]}>
            <label>User ID:</label>
            <input type="text" name="id" value={formData.id} readOnly />
          </div>

          <div className={styles["form-row"]}>
            <label>User Name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className={styles["form-row"]}>
            <label>Mail:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles["form-row"]}>
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>

          <div className={styles["form-row"]}>
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>

          <div className={styles["form-row"]}>
            <label>Birth Date:</label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
            />
          </div>

          <div className={styles["form-row"]}>
            <label>Locality:</label>
            <input
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
            />
          </div>

          <div className={styles["form-row"]}>
            <label>Municipality:</label>
            <input
              type="text"
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Save</button>
        </form>
        <form
          className={styles["form-structure"]}
          onSubmit={handlePasswordChange}
        >
          <h4>Change password</h4>
          <div className={styles["form-row"]}>
            <label>Password:</label>
            <input type="password" name="current" required />
          </div>
          <div className={styles["form-row"]}>
            <label>New Password:</label>
            <input type="password" name="new" required />
          </div>
          <button type="submit">Change Password</button>
        </form>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserDetail;
