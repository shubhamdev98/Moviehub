import React, { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import "./index.css";
function App() {
  const [query, setQuery] = useState("Inception");
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState("");
  const [watched, setWacthed] = useState([]);
  function handleWatched(movie) {
    console.log("click watched", movie);
    setWacthed((cur) => [...cur, movie]);
  }
  console.log(typeof query);
  console.log(movie);
  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setIsError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=418f660d&s=${query}`
        );
        if (!res.ok) {
          throw new Error("something went wrong in fetching movies");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("movie not found");
        }
        setMovie(data.Search);
      } catch (error) {
        setIsError(error.message);
      } finally {
        setIsLoading(false);
      }
      if (query.length < 3) {
        // setMovie([])
        setIsError("");
      }
    }
    fetchMovie();
  }, [query]);
  return (
    <div>
      <Navbar setquery={setQuery} />
      <div className="flex m-2">
        {/* Left Section */}
        <div className="w-1/2 p-4 bg-slate-900">
          {/* Content for left section */}

          {isLoading && <Loader />}
          {!isLoading && !error && (
            <Movie movie={movie} handleWatched={handleWatched} />
          )}
          {error && <ErrorMessage message={error} />}
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-4 bg-amber-100">
          <WatchedMovie watched={watched} />
        </div>
      </div>
    </div>
  );
}
function Movie({ movie, handleWatched }) {
  return (
    <>
      {movie?.map((m, i) => (
        <div
          key={i}
          className="flex max-w-4xl mb-2 bg-zinc-800 shadow-lg rounded-lg overflow-hidden"
          onClick={() => handleWatched(m)}
        >
          <img className="w-20 p-2 object-cover" src={m.Poster} alt={m.title} />
          <div className="w-2/3 p-4">
            <h2 className=" text-fuchsia-300 mb-2">{m.Title}</h2>
            <p className="text-yellow-700">
              <strong>Year:</strong> {m.Year}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
function Loader() {
  return <p>Loading...</p>;
}
function ErrorMessage({ message }) {
  return <p className="text-white">{message}</p>;
}

function WatchedMovie({ watched }) {
  return (
    <>
      {watched.map((w, i) => (
        <div
          key={i}
          className="flex max-w-4xl mb-2 bg-zinc-800 shadow-lg rounded-lg overflow-hidden"
        >
          <img className="w-20 p-2 object-cover" src={w.Poster} alt={w.title} />
          <div className="w-2/3 p-4">
            <h2 className=" text-fuchsia-300 mb-2">{w.Title}</h2>
            <p className="text-yellow-700">
              <strong>Year:</strong> {w.Year}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
export default App;
