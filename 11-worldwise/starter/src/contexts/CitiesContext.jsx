import { useReducer } from "react";
import { createContext, useEffect, useState, useContext } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  error: null,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        error: null,
        currentCity: action.payload,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        error: null,
        cities: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        error: null,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        error: null,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  // const [error, setError] = useState(null);

  useEffect(function () {
    const controller = new AbortController();

    async function fetchCities() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/cities`, {
          signal: controller.signal,
        });
        // if (!res.ok) throw new Error("Something went wrong with fetching");
        const data = await res.json();
        console.log("data", data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(`⛔️⛔️⛔️ ERROR: ${err.message}`);
          dispatch({ type: "rejected", payload: err.message });
        }
      }
    }

    fetchCities();

    // return function () {
    //   controller.abort();
    // };
  }, []);

  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);

      if (!res.ok) throw new Error("Something went wrong with fetching");

      const data = await res.json();

      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log(`⛔️⛔️⛔️ ERROR: ${err.message}`);
        dispatch({ type: "rejected", payload: err.message });
      }
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
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

      if (!res.ok) throw new Error("Something went wrong creating the city");

      const data = await res.json();

      console.log(data);
      // And update the list of cities (since it is only fetched once):
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log(`⛔️⛔️⛔️ ERROR: ${err.message}`);
        dispatch({ type: "rejected", payload: err.message });
      }
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // <-- this is the key to include the cookie in the request!
        mode: "cors", // <-- this is the key to include the cookie in the request!
        cache: "no-cache", // <-- this is the key to include the cookie in the request!
        redirect: "follow", // <-- this is the key to include the cookie in the request!
        referrer: "no-referrer", // <-- this is the key to include the cookie in the request!
      });

      if (!res.ok)
        throw new Error("Something went wrong with deleting the city");

      const data = await res.json();

      // And update the list of cities (since it is only fetched once):
      dispatch({ type: "cities/deleted", payload: id });

      // And update the list of cities (since it is only fetched once):
      // setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      if (err.name !== "AbortError") {
        console.log(`⛔️⛔️⛔️ ERROR: ${err.message}`);
        dispatch({ type: "rejected", payload: err.message });
      }
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
        deleteCity,
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
