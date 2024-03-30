import { createContext, useEffect, useState, useContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState({});

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

  async function getCity(id) {
    try {
      setIsLoading(true);
      setError(null);
      console.log("API call");

      const res = await fetch(`${BASE_URL}/cities/${id}`);

      if (!res.ok) throw new Error("Something went wrong with fetching");

      const data = await res.json();

      // if (!data) {
      //   console.log("no data");
      //   throw new Error("No data found");
      // }

      setCurrentCity(data);
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

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      setError(null);
      console.log("API call");

      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // <-- this is the key to include the cookie in the request!
        mode: "cors", // <-- this is the key to include the cookie in the request!
        cache: "no-cache", // <-- this is the key to include the cookie in the request!
        redirect: "follow", // <-- this is the key to include the cookie in the request!
        referrer: "no-referrer", // <-- this is the key to include the cookie in the request!
      });

      if (!res.ok) throw new Error("Something went wrong with fetching");

      const data = await res.json();

      console.log(data);
      // And update the list of cities (since it is only fetched once):
      setCities((cities) => [...cities, data]);
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

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCity,
        createCity,
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
