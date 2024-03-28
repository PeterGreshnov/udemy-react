import { createContext, useEffect, useState, useContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    const controller = new AbortController();

    async function fetchCities() {
      try {
        setIsLoading(true);
        setError(null);
        console.log("API call");

        const res = await fetch(`${BASE_URL}/cities`, {
          signal: controller.signal,
        });

        // if (!res.ok) throw new Error("Something went wrong with fetching");

        const data = await res.json();

        // if (!data) {
        //   console.log("no data");
        //   throw new Error("No data found");
        // }

        console.log("data", data);
        setCities(data);
      } catch (err) {
        console.log("error");
        if (err.name !== "AbortError") {
          console.log(`⛔️⛔️⛔️ ERROR: ${err.message}`);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();

    // return function () {
    //   controller.abort();
    // };
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
