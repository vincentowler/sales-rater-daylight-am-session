const baseUrl = import.meta.env.VITE_SALES_RATER_API_BASE_URL;

export type Accessorial = {
  chargeDescription: string;
  charge: number;
  unit: string;
  min: number;
  max: number;
};

export async function getAccessorials() {
  const url = `${baseUrl}/internal/v1/self-service/rater/accessorials`;
  const res = await fetch(url);
  if (!res.ok) throw res;
  return res.json() as Promise<Accessorial[]>;
}
