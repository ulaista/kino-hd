import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Movie } from "../stores/MovieStore";
import { Link } from "react-router-dom";
import movieStore from "../stores/MovieStore";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const handleAddToFavorites = () => {
    movieStore.addFavorite(movie);
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={movie.poster}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.rating}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/movie/${movie.id}`}>
          Learn More
        </Button>
        <Button size="small" onClick={handleAddToFavorites}>
          Add to Favorites
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;