import { Router } from "express";
import { modelRoutes } from "./domains/model/modelRoutes";
export const routes = Router();

routes.use("/model", modelRoutes);
