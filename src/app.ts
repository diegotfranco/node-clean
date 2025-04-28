import express from "express";
import routes from "routes";
import { notFound } from "middlewares/notFound";
import { errorHandler } from "middlewares/errorHandler";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
