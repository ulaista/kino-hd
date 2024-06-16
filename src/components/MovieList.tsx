import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import movieStore from "../stores/MovieStore";
import MovieCard from "./MovieCard";

const MovieList: React.FC = observer(() => {
  useEffect(() => {
    movieStore.fetchMovies();
  }, []);

  return (
    <div>
      {movieStore.movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
});

export default MovieList;