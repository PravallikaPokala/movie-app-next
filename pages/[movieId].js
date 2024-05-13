import MovieInfo from "@/components/MovieDetails/MovieInfo";
import { fetchMovies } from "./api/fetchMovies";
import { fetchMovieDetails } from "./api/fetchMovieDeatils";
import MovieTileList from "@/components/MovieTileList";
import Layout from "./Layout";

const MoviePage = ({ movie, moviesList }) => {
  return (
    <Layout>
      <MovieInfo movie={movie} />
      <MovieTileList moviesList={moviesList} />
    </Layout>
  );
};

export async function getServerSideProps({ query, params }) {
  try {
    const [response1, response2] = await Promise.all([
      fetchMovies({ query }),
      fetchMovieDetails({ params }),
    ]);
    console.log(response2);
    return {
      props: {
        movie: response2.movie,
        moviesList: response1.moviesList,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        movie: null,
        moviesList: null,
      },
    };
  }
}

export default MoviePage;
