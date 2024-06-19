import { makeAutoObservable, action } from "mobx";
import axios from "axios";

export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: {
    kp: number;
    imdb: number;
    filmCritics?: number;
    russianFilmCritics?: number;
  };
  poster: string;
  genres: string[];
  description: string;
  countries: string[];
  movieLength: number;
  votes: {
    kp: number;
    imdb: number;
  };
}

class MovieStore {
  allMovies: Movie[] = [];
  filteredMovies: Movie[] = [];
  favorites: Movie[] = [];
  selectedMovie: Movie | null = null;
  filter: {
    genres: string[];
    rating: [number, number];
    year: [number, number];
  } = {
    genres: [],
    rating: [0, 10],
    year: [1990, new Date().getFullYear()],
  };
  currentPage: number = 1;
  moviesPerPage: number = 50;

  constructor() {
    makeAutoObservable(this, {
      fetchMovies: action,
      fetchMovieDetails: action,
      setFilter: action,
      addFavorite: action,
      removeFavorite: action,
      setPage: action,
    });
    this.loadFavorites();
  }

  fetchMovies = async () => {
    try {
      const response = await axios.get(`https://api.kinopoisk.dev/v1/movie`, {
        headers: {
          'X-API-KEY': process.env.REACT_APP_API_KEY,
        },
        params: {
          limit: 150,
        },
      });
      const movieSet = new Set();
      this.allMovies = response.data.docs.map((movie: any) => {
        const russianTitle = movie.names.find((name: any) => name.language === "RU")?.name || movie.name;
        let movieId = movie.id;

        // Ensure unique movie ID
        while (movieSet.has(movieId)) {
          movieId += '-duplicate';
        }
        movieSet.add(movieId);

        return {
          id: movieId,
          title: russianTitle,
          year: Number(movie.year),
          rating: {
            kp: Number(movie.rating.kp),
            imdb: Number(movie.rating.imdb),
            filmCritics: movie.rating.filmCritics,
            russianFilmCritics: movie.rating.russianFilmCritics,
          },
          poster: movie.poster?.url,
          genres: movie.genres.map((genre: any) => genre.name),
          description: movie.description,
          countries: movie.countries.map((country: any) => country.name),
          movieLength: movie.movieLength,
          votes: {
            kp: movie.votes.kp,
            imdb: movie.votes.imdb,
          },
        };
      });
      this.applyFilters();
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  fetchMovieDetails = async (id: string) => {
    try {
      const response = await axios.get(`https://api.kinopoisk.dev/v1/movie/${id}`, {
        headers: {
          'X-API-KEY': process.env.REACT_APP_API_KEY,
        },
      });
      const movie = response.data;
      const russianTitle = movie.names.find((name: any) => name.language === "RU")?.name || movie.name;

      this.selectedMovie = {
        id: movie.id,
        title: russianTitle,
        year: Number(movie.year),
        rating: {
          kp: Number(movie.rating.kp),
          imdb: Number(movie.rating.imdb),
          filmCritics: movie.rating.filmCritics,
          russianFilmCritics: movie.rating.russianFilmCritics,
        },
        poster: movie.poster?.url,
        genres: movie.genres.map((genre: any) => genre.name),
        description: movie.description,
        countries: movie.countries.map((country: any) => country.name),
        movieLength: movie.movieLength,
        votes: {
          kp: movie.votes.kp,
          imdb: movie.votes.imdb,
        },
      };
    } catch (error) {
      console.error("Failed to fetch movie details", error);
    }
  };

  setFilter = (filter: Partial<typeof this.filter>) => {
    this.filter = { ...this.filter, ...filter };
    this.applyFilters();
  };

  applyFilters = () => {
    this.filteredMovies = this.allMovies.filter((movie) => {
      const movieRating = Number(movie.rating.kp);
      const movieYear = Number(movie.year);

      const matchesGenres = this.filter.genres.length === 0 || this.filter.genres.every(genre => movie.genres.includes(genre));
      const matchesRating = movieRating >= this.filter.rating[0] && movieRating <= this.filter.rating[1];
      const matchesYear = movieYear >= this.filter.year[0] && movieYear <= this.filter.year[1];

      return matchesGenres && matchesRating && matchesYear;
    });
  };

  setPage = (page: number) => {
    this.currentPage = page;
  };

  addFavorite = (movie: Movie) => {
    if (!this.favorites.find(fav => fav.id === movie.id)) {
      this.favorites.push(movie);
      this.saveFavorites();
    }
  };

  removeFavorite = (id: string) => {
    this.favorites = this.favorites.filter(movie => movie.id !== id);
    this.saveFavorites();
  };

  saveFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  };

  loadFavorites = () => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
    }
  };

  get paginatedMovies() {
    const startIndex = (this.currentPage - 1) * this.moviesPerPage;
    const endIndex = startIndex + this.moviesPerPage;
    return this.filteredMovies.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.filteredMovies.length / this.moviesPerPage);
  }
}

const movieStore = new MovieStore();
export default movieStore;