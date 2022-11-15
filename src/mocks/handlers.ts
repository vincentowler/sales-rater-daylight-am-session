// src/mocks/handlers.js
import { rest } from "msw";
import { accessorials } from "./data/accessorials";

export const handlers = [
  rest.get(
    "https://test-api.dylt.com/internal/v1/self-service/rater/accessorials",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(accessorials));
    }
  ),
];
