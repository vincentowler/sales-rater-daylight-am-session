// src/mocks/handlers.js
import { rest } from "msw";
import { urls } from "../utils/urlUtils";
import { accessorials } from "./data/accessorials";
import { cityStateZips } from "./data/cities";

export const handlers = [
  rest.get(urls.accessorials, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(accessorials));
  }),
  rest.get(urls.cityByZip(":zip"), (req, res, ctx) => {
    const { zip } = req.params;
    if (!Number.isInteger(Number(zip))) return res(ctx.status(400));
    const matchingCity = cityStateZips[zip as unknown as number];
    if (!matchingCity) return res(ctx.status(404));
    return res(ctx.status(200), ctx.json(matchingCity));
  }),
];
