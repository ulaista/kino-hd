import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, ThemeProvider, CssBaseline } from "@mui/material";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import MovieDetails from "./components/MovieDetails";
import Header from "./components/Header";
import { lightTheme, darkTheme } from "./theme";

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;