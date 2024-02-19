import { modelRoutes } from "./domains/model/ModelRoutes.js";
import { Router } from "express";

export const routes = Router();

routes.use("/model", modelRoutes);

