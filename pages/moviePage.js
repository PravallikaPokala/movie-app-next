import MovieTileList from "../components/MovieTileList";

export default function Movie({ moviesList }) {
  return <MovieTileList moviesList={moviesList} />;
}

export async function getServerSideProps(context) {
  try {
    alert("HI");
    const { query } = context;
    let url = "http://localhost:4000/movies?limit=30";
    // Add query parameters to the URL
    if (query.search) {
      url += `&search=${encodeURIComponent(query.search)}&searchBy=title`;
    }
    if (query.sort) {
      url += `&sortBy=${query.sort}&sortOrder=asc`;
    }
    if (query.genre && query.genre !== "All") {
      url += `&filter=${encodeURIComponent(query.genre)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    const data = await response.json();
    console.log(data);
    return {
      props: {
        moviesList: data.data || [],
      },
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return {
      props: {
        moviesList: [], // Provide a default value in case of error
      },
    };
  }
}
