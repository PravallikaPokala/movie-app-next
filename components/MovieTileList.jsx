import React from "react";
import MovieTile from "./MovieTile/MovieTile";
import MovieGenreList from "./Genre/Genre";
import SortControl from "./SortControl/SortControl";
import { useRouter } from "next/router";
import styles from "@/styles/MovieTile.module.css";

const MovieTileList = ({ moviesList }) => {
  const router = useRouter();
  const { query } = router;

  const handleMovieClick = (movie) => {
    router.push(`/${movie.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteMovie = (Id) => {
    alert(`Selected to Delete movie with ID:${Id}`);
  };

  const handleSortBy = (newValue) => {
    router.push({
      query: {
        ...query,
        sort: newValue,
      },
    });
  };

  const handleSelectedGenre = (genre) => {
    router.push({
      query: {
        ...query,
        genre,
      },
    });
  };

  return (
    <div>
      <hr></hr>
      <div className={styles.genreList}>
        <div className={styles.leftSection}>
          <MovieGenreList
            genres={[
              "All",
              "Adventure",
              "Science Fiction",
              "Fantasy",
              "Action",
            ]}
            selectedGenre={query.genre || ""}
            onSelect={handleSelectedGenre}
          />
        </div>
        <div className={styles.rightSection}>
          <SortControl
            currentSelection={query.sort || ""}
            onSelectionChange={handleSortBy}
          />
        </div>
      </div>
      <hr></hr>
      <h1 style={{ textAlign: "left" }}>
        <b>{moviesList ? moviesList.length : 0} </b> movies found
      </h1>
      <div className={styles.moviesList}>
        {moviesList &&
          moviesList.map((movie) => (
            <MovieTile
              key={movie.id}
              movie={movie}
              onClick={() => handleMovieClick(movie)}
              onDelete={() => handleDeleteMovie(movie.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default MovieTileList;
