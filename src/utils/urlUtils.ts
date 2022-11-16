const baseUrl = import.meta.env.VITE_SALES_RATER_API_BASE_URL;

export const urls = {
  accessorials: baseUrl + "/internal/v1/self-service/rater/accessorials",
  cityByZip: (zip: string) =>
    `${baseUrl}/internal/v1/self-service/rater/city-by-zip/${zip}`,
} as const;
