import React, { useState } from "react";
import styles from "./Search.module.css";

export default function Search({ searchQuery, onSearch }) {
  const [searchInput, setSearchInput] = useState(searchQuery || "");

  const handleChange = (event) => setSearchInput(event.target.value);

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchInput);
  };

  return (
    <div className={styles.searchDiv}>
      <form onSubmit={handleSearch} style={{ textAlign: "center" }}>
        <h2 style={{ color: "#FFFFFF" }}>FIND YOUR MOVIE</h2>
        <input
          type="text"
          className={styles.searchForm}
          placeholder="What do you want to watch?"
          value={searchInput}
          onChange={handleChange}
        ></input>{" "}
        <button className={styles.searchButton} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
