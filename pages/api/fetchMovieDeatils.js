export async function fetchMovieDetails({ params }) {
  const { movieId } = params;
  try {
    // Fetch movie data based on movieId
    const response = await fetch(`http://localhost:4000/movies/${movieId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }
    const movie = await response.json();
    // const moviesList = await fetchMovies(context);
    return {
      props: {
        movie,
        // moviesList,
      },
    };
  } catch (error) {
    console.error("Error fetching movie:", error);
    return {
      props: {
        movie: null, // Handle error case
      },
    };
  }
}
