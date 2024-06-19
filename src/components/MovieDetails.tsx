import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Button, useMediaQuery, useTheme } from '@mui/material';
import movieStore from '../stores/MovieStore';

const MovieDetails: React.FC = observer(() => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      movieStore.fetchMovieDetails(id).then(() => {
        setIsFavorite(movieStore.favorites.some(movie => movie.id === id));
      });
    }
  }, [id]);

  useEffect(() => {
    setIsFavorite(movieStore.favorites.some(movie => movie.id === id));
  }, [id, movieStore.favorites]);

  if (!movieStore.selectedMovie) {
    return <div>Загрузка...</div>;
  }

  const { title, year, rating, description, poster, genres, countries, movieLength, votes } = movieStore.selectedMovie;

  const handleToggleFavorite = () => {
    if (isFavorite) {
      movieStore.removeFavorite(id!);
    } else {
      movieStore.addFavorite(movieStore.selectedMovie!);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Box p={isMobile ? 2 : 4}>
      <Paper elevation={3} style={{ padding: isMobile ? '16px' : '32px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <img src={poster} alt={title} style={{ width: '100%', borderRadius: '8px' }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Год:</strong> {year}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Рейтинг (KP):</strong> {rating.kp} / 10
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Рейтинг (IMDB):</strong> {rating.imdb} / 10
            </Typography>
            {rating.filmCritics !== undefined && (
              <Typography variant="body1" gutterBottom>
                <strong>Рейтинг критиков:</strong> {rating.filmCritics}
              </Typography>
            )}
            {rating.russianFilmCritics !== undefined && (
              <Typography variant="body1" gutterBottom>
                <strong>Рейтинг критиков в России:</strong> {rating.russianFilmCritics}
              </Typography>
            )}
            <Typography variant="body1" gutterBottom>
              <strong>Жанры:</strong> {genres.join(', ')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Страны:</strong> {countries.join(', ')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Длительность:</strong> {movieLength} minutes
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Описание:</strong> {description}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Голосование (KP):</strong> {votes.kp}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Голосование (IMDB):</strong> {votes.imdb}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
});

export default MovieDetails;