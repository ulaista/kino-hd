import { makeAutoObservable, action } from "mobx";
import axios from "axios";

export interface Movie {
  id: string;
  title: string;
  year: string;
  rating: number;
  poster: string;
  genres: string[];
  description: string;
}

class MovieStore {
  movies: Movie[] = [];
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

  constructor() {
    makeAutoObservable(this, {
      fetchMovies: action,
      setFilter: action,
      addFavorite: action,
      removeFavorite: action,
    });
    this.loadFavorites();
  }

  fetchMovies = async () => {
    try {
      const response = await axios.get(`/api/v1/movie`, {
        headers: {
          'X-API-KEY': process.env.REACT_APP_API_KEY,
        },
      });
      this.movies = response.data.docs.map((movie: any) => {
        const russianTitle = movie.names.find((name: any) => name.language === "RU")?.name || movie.name;
        return {
          id: movie.id,
          title: russianTitle,
          year: movie.year,
          rating: movie.rating.kp,
          poster: movie.poster?.url,
          genres: movie.genres.map((genre: any) => genre.name),
          description: movie.description,
        };
      });
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  setFilter = (filter: Partial<typeof this.filter>) => {
    this.filter = { ...this.filter, ...filter };
  };

  addFavorite = (movie: Movie) => {
    this.favorites.push(movie);
    this.saveFavorites();
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
}

const movieStore = new MovieStore();
export default movieStore;