import React from "react";
import { observer } from "mobx-react-lite";
import movieStore from "../stores/MovieStore";
import MovieCard from "../components/MovieCard";

const FavoritesPage: React.FC = observer(() => {
  return (
    <div>
      <h1>Favorites</h1>
      {movieStore.favorites.length > 0 ? (
        movieStore.favorites.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <p>No favorite movies yet.</p>
      )}
    </div>
  );
});

export default FavoritesPage;