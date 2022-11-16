import { useEffect, useState } from "react";
import "./App.css";
import { Accessorial, getAccessorials } from "./services/accessorialsApi";
import { CityState, getCityByZip } from "./services/citiesApi";

function App() {
  const [accessorials, setAccessorials] = useState<Accessorial[]>([]);
  const [originZone, setOriginZone] = useState("");
  const [originCityState, setOriginCityState] = useState<CityState | null>(
    null
  );

  useEffect(() => {
    async function getData() {
      const accessorialsResp = await getAccessorials();
      setAccessorials(accessorialsResp);
    }
    getData();
    // Empty array means run this useEffect one time after the first render.
  }, []);

  return (
    <>
      <div>
        <label>Origin Zone</label>
        <br />
        <input
          type="text"
          onChange={(event) => setOriginZone(event.target.value)}
          onBlur={async () => {
            const cityState = await getCityByZip(originZone);
            setOriginCityState(cityState);
          }}
          value={originZone}
        />
        {originCityState &&
          " " + originCityState.city + ", " + originCityState.state}
      </div>
      <label>Destination Zone</label>
      <br />
      <input type="text" />

      {accessorials.map((accessorial) => (
        <div>{accessorial.chargeDescription}</div>
      ))}
    </>
  );
}

export default App;
