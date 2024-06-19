import React from 'react';
import { observer } from 'mobx-react-lite';
import { Box, Grid, Button, Paper } from '@mui/material';
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
            <Paper elevation={3} style={{ padding: '16px' }}>
              <MovieCard movie={movie} />
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveFavorite(movie.id)}
                  fullWidth
                >
                  Удалить из избранного
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

export default FavoritesPage;