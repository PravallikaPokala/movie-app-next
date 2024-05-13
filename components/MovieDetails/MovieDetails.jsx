import React from "react";
import Image from "next/image";
import styles from "./MovieDetails.module.css";

const MovieDetails = ({ movie }) => {
  const releaseDate = new Date(movie.release_date);
  const year = releaseDate.getFullYear();

  const getDuration = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  return (
    <div className={styles.movieDetails}>
      <div className={styles.posterImage}>
        <img
          src={movie.poster_path}
          alt={movie.title}
          onError={(e) => {
            e.target.src =
              "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
          }}
          width={300}
          height={450}
        />
      </div>
      <div className={styles.info}>
        <h2 style={{ display: "flex" }}>
          {movie.title}
          <span className={styles.rating}>{movie.vote_average}</span>
        </h2>
        <p>{movie.genres.join(", ")}</p>
        <p style={{ color: "#f65261" }}>
          {year}
          <span style={{ marginLeft: "45px" }}>
            {getDuration(movie.runtime)}
          </span>
        </p>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
