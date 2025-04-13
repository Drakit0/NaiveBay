"use client";

import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";

const EditElement = ({ element, handleSubmit }) => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2 className={styles.title}>Edit</h2>
        <form className={styles.structure} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label>User ID:</label>
            <input type="text" name="id" value={element.id || ""} readOnly />
          </div>
          {Object.entries(element).map(([key, value]) => {
            if (key === "id") return null;
            return (
              <div key={`${key}-${value}`} className={styles.row}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                <input type="text" name={key} value={value} />
              </div>
            );
          })}
          <button type="submit" onSubmit={handleSubmit}>
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditElement;
