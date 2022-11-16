import { useEffect, useState } from "react";
import "./App.css";
import { Accessorial, getAccessorials } from "./services/accessorialsApi";

function App() {
  const [accessorials, setAccessorials] = useState<Accessorial[]>([]);

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
        <input type="text" />
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
