import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import { Accessorial, getAccessorials } from "./services/accessorialsApi";
import { CityState, getCityByZip } from "./services/citiesApi";
import ErrorFallback from "./shared/ErrorFallback";
import Input from "./shared/Input";
import TotalCharges from "./TotalCharges";

interface Errors {
  originZone?: string;
  destinationZone?: string;
}

interface Touched {
  originZone?: boolean;
  destinationZone?: boolean;
}

type Status = "idle" | "submitted";

function App() {
  const [accessorials, setAccessorials] = useState<Accessorial[]>([]);
  const [originZone, setOriginZone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Touched>({});
  const [originCityState, setOriginCityState] =
    useState<CityState | null>(null);

  useEffect(() => {
    async function getData() {
      const accessorialsResp = await getAccessorials();
      setAccessorials(accessorialsResp);
    }
    getData();
    // Empty array means run this useEffect one time after the first render.
  }, []);

  function validateForm() {
    const errors: Errors = {};
    if (
      (status === "submitted" || touched.originZone) &&
      originZone.length !== 5
    ) {
      errors.originZone = "Origin Zone must be a valid 5 digit Zip code.";
    }
    return errors;
  }

  // Derived state - Using existing state to determine if the form has errors.
  const errors = validateForm();

  return (
    <>
      <div>
        <Input
          error={errors.originZone}
          label="Origin Zone"
          id="origin-zone"
          onChange={(event) => setOriginZone(event.target.value)}
          onBlur={async () => {
            // Using the function form of set state to safely reference existing state.
            // Wrapping right-hand side in parentheses so we can omit the return keyword and it's not interpreted as a block.
            setTouched((touched) => ({ ...touched, originZone: true }));

            // Only fetch if there's a value provided
            if (originZone) {
              const cityState = await getCityByZip(originZone);
              setOriginCityState(cityState);
            }
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
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <TotalCharges />
      </ErrorBoundary>
      <button
        onClick={() => {
          validateForm();
          setStatus("submitted");
        }}
      >
        Calculate
      </button>
    </>
  );
}

export default App;
