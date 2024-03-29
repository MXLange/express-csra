import LoginController from "./LoginController.js";
import { Router } from "express";

export const loginRoutes = Router();

const loginController = new LoginController();

loginRoutes.get("/", loginController.tokenVerify);
loginRoutes.post("/", loginController.loginJwt);


