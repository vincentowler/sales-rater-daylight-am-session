const baseUrl = import.meta.env.VITE_ACCESSORIALS_API_BASE_URL;

export async function getAccessorials() {
  const url = `${baseUrl}/internal/v1/self-service/rater/accessorials`;
  const res = await fetch(url);
  if (!res.ok) throw res;
  return res.json();
}
