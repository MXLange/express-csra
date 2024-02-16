import { Routes } from "express";
import { modelController } from "./modelController";

export const modelRoutes = Routes();

modelRoutes.get("/", modelController.getAll);
modelRoutes.get("/:id", modelController.getById);
modelRoutes.post("/", modelController.create);
modelRoutes.put("/:id", modelController.update);
modelRoutes.delete("/:id", modelController.delete);


