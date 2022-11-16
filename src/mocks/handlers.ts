// src/mocks/handlers.js
import { rest } from "msw";
import { accessorials } from "./data/accessorials";
import { cityStateZips } from "./data/cities";

const baseUrl = import.meta.env.VITE_SALES_RATER_API_BASE_URL;

export const handlers = [
  rest.get(
    `${baseUrl}/internal/v1/self-service/rater/accessorials`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(accessorials));
    }
  ),
  rest.get(
    `${baseUrl}/internal/v1/self-service/rater/city-by-zip/:zip`,
    (req, res, ctx) => {
      const { zip } = req.params;
      if (!Number.isInteger(Number(zip))) return res(ctx.status(400));
      const matchingCity = cityStateZips[zip as unknown as number];
      if (!matchingCity) return res(ctx.status(404));
      return res(ctx.status(200), ctx.json(matchingCity));
    }
  ),
];
