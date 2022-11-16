import { urls } from "../utils/urlUtils";

export type CityState = {
  city: string;
  state: string;
};

export async function getCityByZip(zip: string) {
  const res = await fetch(urls.cityByZip(zip));
  if (!res.ok) throw res;
  return res.json() as Promise<CityState>;
}
