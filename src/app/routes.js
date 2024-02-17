import { modelRoutes } from "./domains/model/modelRoutes.js";
import { Router } from "express";

export const routes = Router();

routes.use("/model", modelRoutes);
