import "./App.css";
import { useState, useEffect } from "react";
import Banner from "./components/Banner";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";

function App() {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);
  useEffect(() => {
    const fetchMovie = async () => {
      const url1 =
        "https://api.themoviedb.org/3/movie/popular?language=vi&page=1";

      const url2 =
        "https://api.themoviedb.org/3/movie/popular?language=vi&page=1";
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const [res1, res2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options),
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();
      setMovie(data1.results);
      setMovieRate(data2.results);
    };
    fetchMovie();
  }, []);

  const handleMovieSearch = async (keyword) => {
    setMovieSearch([])
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=vi&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      const response = await fetch(url, options);
      const data = await response.json();
      setMovieSearch(data.results);
      console.log(data.results)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black pd-10">
      <Header onSearch={handleMovieSearch}  />
      <Banner />
      {movieSearch.length > 0 ? <MovieSearch title={"List Search"} movie={movieSearch} /> : (<>
        <MovieList title={"Phim Hot"} movie={movie} />
        <MovieList title={"Phim Đề Cử"} movie={movieRate} />
      </>)}

    </div>
  );
}

export default App;
