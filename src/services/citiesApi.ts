const baseUrl = import.meta.env.VITE_SALES_RATER_API_BASE_URL;

export type CityState = {
  city: string;
  state: string;
};

export async function getCityByZip(zip: string) {
  const url = `${baseUrl}/internal/v1/self-service/rater/city-by-zip/${zip}`;
  const res = await fetch(url);
  if (!res.ok) throw res;
  return res.json() as Promise<CityState>;
}
