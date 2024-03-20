import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import WatchedMovie from "./WatchedMovie";

const tempMovieData = [
    {
        imdbID: "tt1375666",
        Title: "Inception",
        Year: "2010",
        Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    },
    {
        imdbID: "tt0133093",
        Title: "The Matrix",
        Year: "1999",
        Poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    },
    {
        imdbID: "tt6751668",
        Title: "Parasite",
        Year: "2019",
        Poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    },
];

const tempWatchedData = [
    {
        imdbID: "tt1375666",
        title: "Inception",
        year: "2010",
        poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        runtime: 148,
        imdbRating: 8.8,
        userRating: 10,
    },
    {
        imdbID: "tt0088763",
        title: "Back to the Future",
        year: "1985",
        poster: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
        runtime: 116,
        imdbRating: 8.5,
        userRating: 9,
    },
];

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const omdbAapiKey = "c3e2f72c";
const tempQuery = "fantomas";

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    // useEffect(function () {
    //     console.log("3. After initial render");
    // }, []);

    // useEffect(function () {
    //     console.log("2. After every render");
    // });

    // console.log("3. During every render");

    // useEffect(
    //     function () {
    //         console.log("4. On init and then with query");
    //     },
    //     [query]
    // );

    function handleSelectMovie(id) {
        setSelectedId((selectedId) => {
            return selectedId === id ? null : id;
        });
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddMovie(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    function handleDeleteMovie(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    useEffect(() => {
        const controller = new AbortController();
        async function fetchMovies() {
            try {
                setError("");
                setIsLoading(true);

                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${omdbAapiKey}&s=${query}`,
                    { signal: controller.signal }
                );

                if (!res.ok)
                    throw new Error("Something went wrong with fetching");

                const data = await res.json();

                if (data.Response === "False")
                    throw new Error("No movies found with that query");

                setMovies(data.Search);
            } catch (err) {
                console.error(`⛔️  ERROR: ${err.message}`);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }
        handleCloseMovie();
        fetchMovies();

        return function () {
            controller.abort();
        };
    }, [query]);

    return (
        <>
            <NavBar>
                <Search
                    query={query}
                    setQuery={setQuery}
                />
                <NumResults movies={movies} />
            </NavBar>

            <Main>
                {/* <Box element={<MovieList movies={movies} />} />
                <Box
                    element={
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList watched={watched} />
                        </>
                    }
                /> */}
                <Box>
                    {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>

                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddMovie={handleAddMovie}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList
                                watched={watched}
                                onDeleteMovie={handleDeleteMovie}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}

function Loader() {
    return (
        <div className="loader">
            <span role="img">🍿</span>
            <h1>Loading...</h1>
            <span role="img">🍿</span>
        </div>
    );
}

function ErrorMessage({ message }) {
    return (
        <p className="error">
            <span>⛔️</span> {message}
        </p>
    );
}

function NavBar({ children }) {
    return (
        <nav className="nav-bar">
            <Logo />
            {children}
        </nav>
    );
}

function Logo() {
    return (
        <div className="logo">
            <span role="img">🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}

function Search({ query, setQuery }) {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}

function NumResults({ movies }) {
    return (
        <p className="num-results">
            Found <strong>{movies.length}</strong> results
        </p>
    );
}

function Main({ children }) {
    return <main className="main">{children}</main>;
}

function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="box">
            <button
                className="btn-toggle"
                onClick={() => setIsOpen((open) => !open)}
            >
                {isOpen ? "–" : "+"}
            </button>
            {isOpen && children}
        </div>
    );
}

// function WatchedBox() {
//     const [isOpen2, setIsOpen2] = useState(true);

//     return (
//         <div className="box">
//             <button
//                 className="btn-toggle"
//                 onClick={() => setIsOpen2((open) => !open)}
//             >
//                 {isOpen2 ? "–" : "+"}
//             </button>
//             {isOpen2 && (
//                 <>
//                     <WatchedSummary watched={watched} />
//                     <WatchedMoviesList watched={watched} />
//                 </>
//             )}
//         </div>
//     );
// }

function MovieList({ movies, onSelectMovie }) {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <MovieItem
                    movie={movie}
                    key={movie.imdbID}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    );
}

function MovieItem({ movie, onSelectMovie }) {
    return (
        <li onClick={() => onSelectMovie(movie.imdbID)}>
            <img
                src={movie.Poster}
                alt={`${movie.Title} poster`}
            />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}

function MovieDetails({ selectedId, onCloseMovie, onAddMovie, watched }) {
    const [movieErr, setMovieErr] = useState("");
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState(null);

    const isWatched = watched.some((movie) => movie.imdbID === selectedId);

    // Get rating of watched movie:
    const watchedMovie = watched.find((movie) => movie.imdbID === selectedId);

    const {
        Title: title,
        Poster: poster,
        Year: year,
        Runtime: runtime,
        Released: released,
        imdbRating,
        Plot: plot,
        Genre: genre,
        Director: director,
        Writer: writer,
        Actors: actors,
        Awards: awards,
        BoxOffice: boxOffice,
        Country: country,
        DVD: dvd,
    } = movie;

    function handleAdd() {
        console.log("Added movie to watched list: ", userRating);

        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            runtime: Number(parseInt(runtime.split(" ").at(0))),
            imdbRating:
                typeof Number(imdbRating) === "number" ? Number(imdbRating) : 1,
            userRating,
        };
        onAddMovie(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(() => {
        async function fetchMovie() {
            try {
                setIsLoading(true);
                setMovieErr("");

                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${omdbAapiKey}&i=${selectedId}`
                );

                if (!res.ok)
                    throw new Error("Something went wrong with fetching");

                const data = await res.json();

                if (data.Response === "False")
                    throw new Error("No movies found with that query");

                setMovie(data);
                setMovieErr("");
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.log(`⛔️  ERROR: ${err.message}`);
                    setMovieErr(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (selectedId) fetchMovie();
        setUserRating(null);
    }, [selectedId]);

    useEffect(() => {
        if (!title) return;
        document.title = `Movie: ${title}`;

        // That is a "cleanup" function
        // It runs when the component unmounts (is removed from the DOM)
        // It also runs when the component rerenders (when switching to another movie)
        return function () {
            document.title = "usePopcorn";
            // title is accessible due to the "closure"
            console.log(`Cleanup effect for movie: ${title}`);
        };
    }, [title]);

    useEffect(
        function () {
            function callback(e) {
                if (e.code === "Escape") {
                    onCloseMovie();
                    console.log("CLOSING MOVIE");
                }
            }

            document.addEventListener("keydown", callback);

            // Return cleanup function for removing these event listeners;
            return function () {
                document.removeEventListener("keydown", callback);
            };
        },
        [onCloseMovie]
    );

    return (
        <div className="details">
            {isLoading && <Loader />}
            {!isLoading && !movieErr && (
                <>
                    <header>
                        <button
                            className="btn-back"
                            onClick={onCloseMovie}
                        >
                            &larr;
                        </button>
                        <img
                            src={poster}
                            alt={`${title} poster`}
                        />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{country}</p>
                            <p>{genre}</p>
                            <p>
                                {released} - {runtime}
                            </p>
                            <p>
                                <span>⭐️</span>
                                <span>{imdbRating} IMDB rating</span>
                            </p>
                        </div>
                    </header>
                    <section>
                        <div className="rating">
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        // onSetRating={(rating) => setUserRating(rating)}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAdd}
                                        >
                                            + Add to list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You rated that movie:{" "}
                                    {watchedMovie?.userRating} <span>⭐️</span>
                                </p>
                            )}
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
            {movieErr && <ErrorMessage message={movieErr} />}
        </div>
    );
}

function WatchedSummary({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime.toFixed(0)} min</span>
                </p>
            </div>
        </div>
    );
}

function WatchedMoviesList({ watched, onDeleteMovie }) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie
                    movie={movie}
                    key={movie.imdbID}
                    onDeleteMovie={onDeleteMovie}
                />
            ))}
        </ul>
    );
}
