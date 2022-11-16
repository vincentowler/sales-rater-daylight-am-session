import { urls } from "../utils/urlUtils";

export type Accessorial = {
  chargeDescription: string;
  charge: number;
  unit: string;
  min: number;
  max: number;
};

export async function getAccessorials() {
  const res = await fetch(urls.accessorials);
  if (!res.ok) throw res;
  return res.json() as Promise<Accessorial[]>;
}
