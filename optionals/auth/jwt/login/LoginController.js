import LoginService from "./LoginService.js";
import AppResponse from "../../shared/classes/AppResponse.js";

export default class LoginController {
    async loginJwt(req, res) {
        const { email, password } = req.body;
        const loginService = new LoginService();
        const token = await loginService.loginJwt({ email, password });
        const response = new AppResponse({
            success: true,
            result: token,
        });
        res.status(200).json(response);
    }
    async tokenVerify(req, res) {
        const { authorization } = req.headers;
        const token = authorization;
        const loginService = new LoginService();
        const isTokenValid = await loginService.tokenVerify({ token });
        const response = new AppResponse({
            success: true,
            result: isTokenValid,
        });
        res.status(200).json(response);
    }
}
