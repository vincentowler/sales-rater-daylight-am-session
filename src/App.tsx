import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AccessorialsTable from "./AccessorialsTable";
import "./App.css";
import { Accessorial, getAccessorials } from "./services/accessorialsApi";
import { CityState, getCityByZip } from "./services/citiesApi";
import ErrorFallback from "./shared/ErrorFallback";
import Input from "./shared/Input";
import Spinner from "./shared/Spinner";
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
  const [pageError, setPageError] = useState<Error | null>(null);
  // Defaulting to true so that the user sees a loading spinner on initial load.
  const [isLoadingAccessorials, setIsLoadingAccessorials] = useState(true);

  useEffect(() => {
    async function getData() {
      const accessorialsResp = await getAccessorials();
      setIsLoadingAccessorials(false);
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

  if (pageError) throw pageError;

  return (
    <>
      <div>
        <Input
          error={errors.originZone}
          label="Origin Zone"
          id="origin-zone"
          onChange={(event) => setOriginZone(event.target.value)}
          onBlur={async () => {
            try {
              // Using the function form of set state to safely reference existing state.
              // Wrapping right-hand side in parentheses so we can omit the return keyword and it's not interpreted as a block.
              setTouched((touched) => ({ ...touched, originZone: true }));

              // Only fetch if there's a value provided
              if (originZone) {
                const cityState = await getCityByZip(originZone);
                setOriginCityState(cityState);
              }
            } catch (error) {
              setPageError(error as Error);
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
        {isLoadingAccessorials ? (
          <Spinner />
        ) : (
          <AccessorialsTable accessorials={accessorials} />
        )}
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
