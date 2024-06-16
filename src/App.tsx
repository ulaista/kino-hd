import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import MovieDetails from "./components/MovieDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;