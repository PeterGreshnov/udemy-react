import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  function handleChangeParams() {
    setSearchParams({ lat: "1", lng: "2", rng: "123" });
  }

  function handleNavigate() {
    navigate("form");
  }

  return (
    <div className={styles.mapContainer} onClick={handleNavigate}>
      <h1>MAP</h1>
      {lat && lng && (
        <>
          <h1>lat = {lat}</h1>
          <h1>lng = {lng}</h1>
        </>
      )}
      <button onClick={handleChangeParams}>Change params</button>
    </div>
  );
}

export default Map;
