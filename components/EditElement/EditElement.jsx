"use client";

import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
import useCategories from "../../hooks/useCategories";

const EditElement = ({ element, handleSubmit }) => {
  const [formData, setFormData] = useState({});
  const { categories, categoryMap, invCategoryMap } = useCategories();

  // Update formData when element changes
  useEffect(() => {
    if (element) {
      setFormData({ ...element });
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category" && value !== "") {
      // Find the ID that corresponds to this category name
      const categoryId = categoryMap[value];
      setFormData((prev) => ({
        ...prev,
        [name]: categoryId, // Store the ID, not the name
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission with updated data
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Edit</h2>
        <form className={styles.structure} onSubmit={onSubmit}>
          {Object.entries(formData).map(([key, value]) => {
            switch (key) {
              case "id": {
                return (
                  <div key={key} className={styles.row}>
                    <label>ID:</label>
                    <input type="text" name="id" value={value || ""} readOnly />
                  </div>
                );
              }
              case "closing_date": {
                return (
                  <div key={key} className={styles.row}>
                    <label>Closing date:</label>
                    <input
                      type={"datetime-local"}
                      name={key}
                      value={value.slice(0, 16) || ""}
                      onChange={handleChange}
                    />
                  </div>
                );
              }
              case "category": {
                return (
                  <div key={key} className={styles.row}>
                    <label>Category:</label>
                    <select
                      name="category"
                      value={invCategoryMap[value] || ""}
                      onChange={handleChange}
                      className={styles.selectInput}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={`${category}-${index}`} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }
              case "image": {
                return (
                  <div key={key} className={styles.row}>
                    <label>Image:</label>
                    <input
                      type={"file"}
                      name={key}
                      accept="image/*"
                      value={value || ""}
                      onChange={handleChange}
                    />
                  </div>
                );
              }
              default: {
                return (
                  <div key={key} className={styles.row}>
                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                    <input
                      type={"text"}
                      name={key}
                      value={value || ""}
                      onChange={handleChange}
                    />
                  </div>
                );
              }
            }
          })}

          <button type="submit">Confirm</button>
        </form>
      </div>
    </div>
  );
};

export default EditElement;
