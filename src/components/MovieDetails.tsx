import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Card, CardMedia, CardContent } from "@mui/material";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.kinopoisk.dev/v1/movie/${id}`, {
          headers: {
            "X-API-KEY": process.env.KINO_APP_API_KEY,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={typeof movie.poster === "string" ? movie.poster : ""}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h3" component="div">
            {movie.title}
          </Typography>
          <Typography variant="h5" component="div">
            {movie.year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {typeof movie.rating === "object" ? movie.rating.kp : movie.rating}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Release Date: {movie.releaseDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Genres: {movie.genres.join(", ")}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MovieDetails;