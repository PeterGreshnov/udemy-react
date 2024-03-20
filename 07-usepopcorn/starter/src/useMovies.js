import { useState, useEffect } from "react";

// export function useMovies(query, callback) {
export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const omdbAapiKey = "c3e2f72c";

    useEffect(() => {
        // callback?.();

        const controller = new AbortController();
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("");

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
                setError("");
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.log(`⛔️⛔️  ERROR: ${err.message}`);
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }
        // handleCloseMovie();
        fetchMovies();

        return function () {
            controller.abort();
        };
    }, [query]);

    return { movies, isLoading, error };
}
