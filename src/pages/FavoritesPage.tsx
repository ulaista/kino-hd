import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Grid, Button } from '@mui/material';
import MovieCard from '../components/MovieCard';
import movieStore from '../stores/MovieStore';

const FavoritesPage: React.FC = observer(() => {
  const handleRemoveFavorite = (id: string) => {
    movieStore.removeFavorite(id);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {movieStore.favorites.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <MovieCard movie={movie} />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRemoveFavorite(movie.id)}
              style={{ marginTop: '8px' }}
            >
              Remove from Favorites
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default FavoritesPage;