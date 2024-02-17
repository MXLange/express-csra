import { Router } from "express";
import { modelRoutes } from "./domains/model/modelRoutes.js";

export const routes = Router();

routes.use("/model", modelRoutes);
