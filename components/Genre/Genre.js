import React from "react";
import styles from "@/styles/MovieTile.module.css";

export default function MovieGenreList({ genres, selectedGenre, onSelect }) {
  return (
    <div>
      {genres.map((genre) => (
        <button
          className={styles.button}
          key={genre}
          onClick={() => onSelect(genre)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            textDecoration: genre === selectedGenre ? "underline red" : "none",
          }}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
