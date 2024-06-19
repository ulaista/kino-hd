import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Movie } from "../stores/MovieStore";
import { Link } from "react-router-dom";
import movieStore from "../stores/MovieStore";

interface MovieCardProps {
  movie: Movie;
  isFavorite?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite = false }) => {
  const [isInFavorites, setIsInFavorites] = useState(isFavorite);

  useEffect(() => {
    setIsInFavorites(movieStore.favorites.some(favMovie => favMovie.id === movie.id));
  }, [movie.id]);

  const handleAddToFavorites = () => {
    movieStore.addFavorite(movie);
    setIsInFavorites(true);
  };

  const handleRemoveFromFavorites = () => {
    movieStore.removeFavorite(movie.id);
    setIsInFavorites(false);
  };

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const ratings = `KP: ${movie.rating.kp}, IMDB: ${movie.rating.imdb}`;
  const description = showFullDescription ? movie.description : `${movie.description.substring(0, 100)}...`;

  return (
    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="240"
        image={movie.poster}
        alt={movie.title}
      />
      <CardContent style={{ flexGrow: 1 }}>
        <Typography variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {ratings}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
          {movie.description.length > 100 && (
            <Button size="small" onClick={handleToggleDescription}>
              {showFullDescription ? "закрыть" : "читать"}
            </Button>
          )}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/movie/${movie.id}`}>
          Описание
        </Button>
        {isInFavorites ? (
          <Button size="small" onClick={handleRemoveFromFavorites}>
            Избранный
          </Button>
        ) : (
          <Button size="small" onClick={handleAddToFavorites}>
            В избранное
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default MovieCard;