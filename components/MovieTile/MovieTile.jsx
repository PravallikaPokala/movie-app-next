import React, { useState } from "react";
import styles from "@/styles/MovieTile.module.css";
import Dialog from "../Dialog/Dialog";
import Link from "next/link";
import { useRouter } from "next/router";

const MovieTile = ({ movie, onClick, onDelete }) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [showDeleteConfirmation, setshowDeleteConfirmation] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  const toggleContextMenu = (event) => {
    event.stopPropagation();
    setShowContextMenu(!showContextMenu);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    setShowContextMenu(false);
  };

  const handleDelete = (event) => {
    event.stopPropagation();
    setShowContextMenu(false);
    setshowDeleteConfirmation(true);
  };

  const confirmDelete = (event) => {
    event.stopPropagation();
    if (onDelete) {
      onDelete(movie.id);
    }
    setshowDeleteConfirmation(false);
  };

  const cancelDelete = (event) => {
    event.stopPropagation();
    setshowDeleteConfirmation(false);
  };

  const releaseDate = new Date(movie.release_date);
  const year = releaseDate.getFullYear();

  return (
    <>
      <div className={styles.movieTile} onClick={handleClick}>
        <img
          src={movie.poster_path}
          alt={movie.title}
          onError={(e) => {
            e.target.src =
              "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg";
          }}
        />
        <div className={styles.contextMenuPopup}>
          <button
            className={styles.contextMenuButton}
            onClick={toggleContextMenu}
          >
            <span className={styles.contextMenuDots}>&#8942;</span>
          </button>
          {showContextMenu && (
            <ul className={styles.contextMenu}>
              <li className={styles.liHover} style={{ listStyleType: "none" }}>
                <Link
                  href={`${movie.id}/edit`}
                  className={styles.editLink}
                  onClick={handleEdit}
                >
                  Edit
                </Link>
              </li>
              <li
                className={styles.liHover}
                style={{ listStyleType: "none" }}
                onClick={handleDelete}
              >
                Delete
              </li>
            </ul>
          )}
        </div>
        <div className={styles.movieTitle}>
          <div className={styles.movieTitleYear}>
            <h2 style={{ textAlign: "left" }}>{movie.title}</h2>
            <p className={styles.year}>{year}</p>
          </div>
          <p style={{ textAlign: "left" }}>{movie.genres.join(", ")}</p>
        </div>
      </div>

      {showDeleteConfirmation && (
        <Dialog title="DELETE MOVIE" onClose={cancelDelete}>
          <p>Are you sure you want to delete this movie?</p>
          <button className={styles.deleteBtn} onClick={confirmDelete}>
            Confirm
          </button>
        </Dialog>
      )}
    </>
  );
};

export default MovieTile;
