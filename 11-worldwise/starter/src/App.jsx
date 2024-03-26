import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";

const BASE_URL = "http://localhost:8000";

function App() {
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
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            />
            <Route
              path="countries"
              element={<CountriesList cities={cities} isLoading={isLoading} />}
            />
            <Route path="form" element={<p>Form</p>} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
