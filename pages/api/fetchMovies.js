export async function fetchMovies(context) {
  try {
    const { query } = context;
    let url = "http://localhost:4000/movies?limit=30";
    // Add query parameters to the URL
    if (query.query) {
      url += `&search=${encodeURIComponent(query.query)}&searchBy=title`;
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

    return {
      moviesList: data.data || [],
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return {
      moviesList: [], // Provide a default value in case of error
    };
  }
}
