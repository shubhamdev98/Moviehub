import React, { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import "./index.css";
function App() {
  const [query, setQuery] = useState("Inception");
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(function () {
    const wm = localStorage.getItem("watched");
    return JSON.parse(wm);
  });

  function handleSelectedId(id) {
    console.log(id);
    setSelectedId(id);
  }
  function handleClose() {
    setSelectedId(null);
  }
  function handleWatchedMovie(movie) {
    setWatched((watched) => [...watched, movie]);
    console.log("Watched", watched);
  }
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
            <Movie movie={movie} handleSelectedId={handleSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-4 bg-amber-100">
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleClose={handleClose}
              handleWatchedMovie={handleWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
function Movie({ movie, handleSelectedId }) {
  return (
    <>
      {movie?.map((m, i) => (
        <div
          key={i}
          className="flex max-w-4xl mb-2 bg-zinc-800 shadow-lg rounded-lg overflow-hidden"
          onClick={() => handleSelectedId(m.imdbID)}
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

function MovieDetails({
  selectedId,
  handleClose,
  handleWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    Actors: actor,
    Plot: plot,
    Title: title,
    Year: year,
    Writer: writer,
    Runtime: runtime,
  } = movie;
  function handleAddMovie(movie) {
    handleWatchedMovie(movie);
    localStorage.setItem("watched", JSON.stringify([...watched, movie]));
    handleClose();
  }
  useEffect(() => {
    async function fetchMovieDetail() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=418f660d&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      } catch (error) {}
    }
    fetchMovieDetail();
  }, [selectedId]);
  console.log(movie);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="p-4 rounded">
            <button
              className="border border-black text-black hover:bg-black hover:text-white font-bold px-4 rounded"
              onClick={handleClose}
            >
              Back
            </button>
          </div>
          <div className="bg-slate-700">
            <div className=" flex p-4 ">
              <div className="w-1/4">
                <img
                  src={movie.Poster}
                  alt=""
                  className=""
                  style={{ width: "100%" }}
                />
              </div>
              <div className="w-1/2 px-6 py-4">
                <h2 className="text-white ">{title}</h2>
                <h2 className="text-white ">{actor}</h2>
                <h2 className="text-white">year : {year}</h2>
                <h2 className="text-white">{writer}</h2>
                <h2 className="text-white">{runtime}</h2>
              </div>
            </div>
            <div className="text-center">
              <button
                className="bg-blue-500 hover:bg-blue-700  text-white  py-2 px-4 rounded"
                onClick={() => handleAddMovie(movie)}
              >
                Add to Watchlist
              </button>
            </div>
            <div className="p-4">
              <p className="text-white italic">{plot}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function WatchedList({ watched }) {
  return (
    <>
      <WatchedMmovie watched={watched} />
    </>
  );
}

function WatchedMmovie({ watched }) {
  return (
    <>
      {watched?.map((watched) => (
        <div
          className="bg-cyan-800 flex mb-2  h-28 rounded-md"
          key={watched.imdbID}
        >
          <div className="w-1/4">
            <img
              className="rounded-sm"
              src={watched.Poster}
              alt=""
              style={{ height: "100%" }}
            />
          </div>

          <div className="flex flex-col w-3/4 p-2">
            <p className="text-white mb-2 "> {watched.Title}</p>
            <p className="text-white mb-2 "> {watched.Year}</p>

            <div className="rating flex  ">
              <p className="text-slate-300 pe-2">{watched.imdbRating}</p>
              <p className="text-slate-300">{watched.Runtime}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
function WatchedSummary({ watched }) {
  return (
    <>
      <div className="bg-red-400 text-white p-4 my-2">
        <p>Total Watched Movie {watched?.length}</p>
      </div>
    </>
  );
}
export default App;
