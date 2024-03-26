import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  function handleClick() {
    setSearchParams({ lat: "1", lng: "2", rng: "123" });
  }

  return (
    <div className={styles.mapContainer}>
      <h1>MAP</h1>
      {lat && lng && (
        <>
          <h1>lat = {lat}</h1>
          <h1>lng = {lng}</h1>
        </>
      )}
      <button onClick={handleClick}>Change params</button>
    </div>
  );
}

export default Map;
