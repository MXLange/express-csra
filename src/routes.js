import { Router } from "express";
import { modelRoutes } from "./app/domains/model/modelRoutes";
export const routes = Router();

routes.use("/model", modelRoutes);
