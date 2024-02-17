import ModelController from "./ModelController.js";
import { Router } from "express";

export const modelRoutes = Router();

const modelController = new ModelController();

modelRoutes.get("/", modelController.getAll);
modelRoutes.get("/:id", modelController.getById);
modelRoutes.post("/", modelController.create);
modelRoutes.put("/:id", modelController.update);
modelRoutes.delete("/:id", modelController.delete);


