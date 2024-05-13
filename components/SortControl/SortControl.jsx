import React from "react";
import styles from "@/styles/SortControl.module.css";

const SortControl = ({ currentSelection, onSelectionChange }) => {
  const handleSelectionChange = (event) => {
    const newValue = event.target.value;
    onSelectionChange(newValue);
  };

  return (
    <div className={styles.sortControl}>
      <label className={styles.sortLabel} htmlFor="sortBy">
        Sort By
      </label>
      <select
        id="sortBy"
        className={styles.sortSelect}
        value={currentSelection}
        onChange={handleSelectionChange}
      >
        <option value="release_date">Release Date</option>
        <option value="vote_average">Rating</option>
        <option value="title">Title</option>
        <option value="revenue">Revenue</option>
      </select>
    </div>
  );
};

export default SortControl;
