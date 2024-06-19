import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import movieStore from "../stores/MovieStore";
import MovieCard from "./MovieCard";
import { Grid, Pagination, Box } from "@mui/material";

const MovieList: React.FC = observer(() => {
  useEffect(() => {
    movieStore.fetchMovies();
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    movieStore.setPage(value);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {movieStore.paginatedMovies.map(movie => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id} style={{ display: 'flex' }}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={movieStore.totalPages}
        page={movieStore.currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ marginTop: 3, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
});

export default MovieList;