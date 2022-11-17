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
        <label htmlFor="origin-zone">Origin Zone</label>
        <br />
        <input
          id="origin-zone"
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

      <section>
        <h2>Accessorials</h2>
        <table>
          <caption>Accessorials</caption>
          <thead>
            <tr>
              <th>Accessorial Charges</th>
              <th>Charge</th>
            </tr>
          </thead>
          <tbody>
            {/* NOTE: A good key is a unique and stable identifier. 
            Typically a primary key from the DB is the best choice.
            Avoid using the array index as a key because doing so provides no performance benefit 
            (it merely quiets the warning). */}
            {accessorials.map((accessorial) => (
              <tr key={accessorial.chargeDescription}>
                <td>
                  <input type="checkbox" id={accessorial.chargeDescription} />
                  <label htmlFor={accessorial.chargeDescription}>
                    {accessorial.chargeDescription}
                  </label>
                </td>
                <td>{accessorial.charge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default App;
