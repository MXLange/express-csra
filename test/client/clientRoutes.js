import { Routes } from "express";
import { clientController } from "./clientController";

export const clientRoutes = Routes();

clientRoutes.get("/", clientController.getAll);
clientRoutes.get("/:id", clientController.getById);
clientRoutes.post("/", clientController.create);
clientRoutes.put("/:id", clientController.update);
clientRoutes.delete("/:id", clientController.delete);


