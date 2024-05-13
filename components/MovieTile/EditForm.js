import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MovieForm from "../MovieForm/MovieForm";
import Dialog from "../Dialog/Dialog";

const EditMoviePage = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/movies/${movieId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  const editMovieDetails = async (formData) => {
    try {
      const response = await fetch(`http://localhost:4000/movies/${movieId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update movie");
      }
      const data = await response.json();
      alert(`${data.title} Movie Updated Successfully`);
      router.back();
    } catch (error) {
      console.error("Error updating movie details:", error);
    }
  };

  const cancelEdit = () => {
    router.back();
  };

  return (
    <Dialog title="Edit MOVIE" onClose={cancelEdit}>
      {movieDetails && (
        <MovieForm
          onSubmit={editMovieDetails}
          initialMovieInfo={movieDetails}
        />
      )}
    </Dialog>
  );
};

export default EditMoviePage;
