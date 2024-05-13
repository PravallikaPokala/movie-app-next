import React from "react";
import MovieDetails from "./MovieDetails";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const MovieInfo = ({ movie }) => {
  const router = useRouter();

  return (
    <div style={{ textAlign: "right" }}>
      <Link
        href={{
          pathname: "/",
          query: router.query,
        }}
      >
        <span
          style={{
            fontSize: "20px",
            backgroundColor: "transparent",
            border: "none",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon icon={faSearch} style={{ color: "red" }} />
        </span>
      </Link>

      {movie && <MovieDetails movie={movie} />}
    </div>
  );
};

export default MovieInfo;
