import React from "react";
import MovieList from "../components/MovieList";
import FilterComponent from "../components/FilterComponent";
import { Box } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Box>
      <FilterComponent />
      <MovieList />
    </Box>
  );
};

export default HomePage;