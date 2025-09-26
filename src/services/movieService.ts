import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieHttpResponse {
  results: Movie[];
};

export const fetchMovies =  async (query: string): Promise<Movie[]> => {    
      const API_KEY = import.meta.env.VITE_API_KEY;

      const options = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`
        },
        params: {
          query: query,
          include_adult: false,
          language: 'en-US',
          page: 1
        }
      }

      const response = await axios.get<MovieHttpResponse>(
        `https://api.themoviedb.org/3/search/movie`,
        options
      );      

      return (response.data.results)
}