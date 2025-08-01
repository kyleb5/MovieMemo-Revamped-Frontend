import axios from 'axios';

const tmdbBearerToken = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export async function getPopularMoviesThisWeek(page: number = 1) {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      headers: {
        'Authorization': `Bearer ${tmdbBearerToken}`,
        'accept': 'application/json'
      },
      params: {
        page: page,
        language: 'en-US'
      }
    });

    return {
      success: true,
      data: response.data,
      movies: response.data.results,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results
    };
  } catch (error: any) {
    console.error('Error fetching trending movies this week:', error);
    return {
      success: false,
      error: error.response?.data?.status_message || error.message || 'Failed to fetch trending movies',
      movies: []
    };
  }
}

// You can also keep the original function for general popular movies
export async function getPopularMovies(page: number = 1) {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      headers: {
        'Authorization': `Bearer ${tmdbBearerToken}`,
        'accept': 'application/json'
      },
      params: {
        page: page,
        language: 'en-US'
      }
    });

    return {
      success: true,
      data: response.data,
      movies: response.data.results,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results
    };
  } catch (error: any) {
    console.error('Error fetching popular movies:', error);
    return {
      success: false,
      error: error.response?.data?.status_message || error.message || 'Failed to fetch popular movies',
      movies: []
    };
  }
}