import { CityState } from "../../services/citiesApi";

type CityStateZips = Record<number, CityState>;

export const cityStateZips: CityStateZips = {
  10001: {
    city: "New York",
    state: "NY",
  },
  90001: {
    city: "Los Angeles",
    state: "CA",
  },
};
