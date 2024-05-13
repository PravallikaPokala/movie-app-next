import { useState } from "react";
import { useRouter } from "next/router";
import MovieForm from "@/components/MovieForm/MovieForm";
import Dialog from "@/components/Dialog/Dialog";
import Layout from "../Layout";
import SearchForm from "@/components/Search/SearchForm";
import MovieTileList from "@/components/MovieTileList";
import { fetchMovieDetails } from "../api/fetchMovieDeatils";
import { fetchMovies } from "../api/fetchMovies";

const EditMoviePage = ({ initialMovieDetails, moviesList }) => {
  const router = useRouter();
  const { movieId } = router.query;
  const [movieDetails, setMovieDetails] = useState(initialMovieDetails);

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
    <Layout>
      <SearchForm></SearchForm>
      <MovieTileList moviesList={moviesList} />
      <Dialog title="Edit MOVIE" onClose={cancelEdit}>
        {movieDetails && (
          <MovieForm
            onSubmit={editMovieDetails}
            initialMovieInfo={movieDetails}
          />
        )}
      </Dialog>
    </Layout>
  );
};

export async function getServerSideProps({ query, params }) {
  try {
    const [response1, response2] = await Promise.all([
      fetchMovies({ query }),
      fetchMovieDetails({ params }),
    ]);

    return {
      props: {
        initialMovieDetails: response2.movie,
        moviesList: response1.moviesList,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        initialMovieDetails: null,
        moviesList: null,
      },
    };
  }
}

export default EditMoviePage;
