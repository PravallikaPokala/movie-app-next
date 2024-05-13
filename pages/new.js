import AddSearchForm from "@/components/Search/AddSearchForm";
import Layout from "./Layout";
import { fetchMovies } from "./api/fetchMovies";
import MovieTileList from "@/components/MovieTileList";
import SearchForm from "@/components/Search/SearchForm";

export async function getServerSideProps(context) {
  try {
    const moviesList = await fetchMovies(context);
    console.log(moviesList.moviesList);
    return {
      props: {
        moviesList: moviesList.moviesList,
      },
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return {
      props: {
        moviesList: [],
      },
    };
  }
}

export default function Home({ moviesList }) {
  return (
    <>
      <Layout>
        <SearchForm></SearchForm>
        <MovieTileList moviesList={moviesList} />;
        <AddSearchForm />
      </Layout>
    </>
  );
}
