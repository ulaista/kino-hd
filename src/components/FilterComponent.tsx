import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, Chip, SelectChangeEvent, useMediaQuery, useTheme, Grid } from '@mui/material';
import movieStore from '../stores/MovieStore';

const genresList = ["драма", "комедия", "боевик", "триллер", "фантастика"];

const FilterComponent: React.FC = observer(() => {
  const [genres, setGenres] = useState<string[]>([]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 10]);
  const [yearRange, setYearRange] = useState<[number, number]>([1990, new Date().getFullYear()]);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleGenreChange = (event: SelectChangeEvent<string[]>) => {
    setGenres(event.target.value as string[]);
  };

  const handleMinRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(10, Number(event.target.value)));
    setRatingRange([value, ratingRange[1]]);
  };

  const handleMaxRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(10, Number(event.target.value)));
    setRatingRange([ratingRange[0], value]);
  };

  const handleMinYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setYearRange([value, yearRange[1]]);
  };

  const handleMaxYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setYearRange([yearRange[0], value]);
  };

  const handleApplyFilter = () => {
    movieStore.setFilter({
      genres,
      rating: ratingRange,
      year: yearRange,
    });
    setFilterVisible(false);
  };

  return (
    <Box mb={2} p={2}>
      <Button variant="contained" color="primary" onClick={() => setFilterVisible(!filterVisible)}>
        Фильтр
      </Button>
      {filterVisible && (
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Жанры</InputLabel>
                <Select
                  multiple
                  value={genres}
                  onChange={handleGenreChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {(selected as string[]).map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {genresList.map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                label="Рейтинг от"
                type="number"
                value={ratingRange[0]}
                onChange={handleMinRatingChange}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                fullWidth
                label="Рейтинг до"
                type="number"
                value={ratingRange[1]}
                onChange={handleMaxRatingChange}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label="От года"
                type="number"
                value={yearRange[0]}
                onChange={handleMinYearChange}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                fullWidth
                label="До года"
                type="number"
                value={yearRange[1]}
                onChange={handleMaxYearChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary" onClick={handleApplyFilter}>
                Фильтровать
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
});

export default FilterComponent;