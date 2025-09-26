import { useState } from 'react';
import toast from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import MovieGrid from "../MovieGrid/MovieGrid";

import { fetchMovies } from "../../services/moviesServices";
import type { Movie } from "../../types/movie";

import styles from './App.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

const notifyEmptyResponse = () => toast.error('No movies found for your request.');


function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number>();
  const [isMovieModalOpen, setIsMovieModalOpen] = useState<boolean>(false);

  const onSelectHandler = (id: number) => {
    setSelectedMovieId(id);
    openMovieModal();
  };

  const openMovieModal = () => setIsMovieModalOpen(true);
  const closeMovieModal = () => setIsMovieModalOpen(false);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const data = await fetchMovies(query);   

      if (data.length === 0) {
        notifyEmptyResponse();
      }   

      setMovieList(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && movieList.length > 0 && <MovieGrid movies={movieList} onSelect={onSelectHandler} />}
      {isMovieModalOpen && <MovieModal movie={movieList.find((movie) => movie.id === selectedMovieId)} onClose={closeMovieModal}/>}
    </div>
  )
}

export default App
