import LoginRepository from "./LoginRepository.js";
import JwtAuth from "../../shared/classes/JwtAuth.js";

export default class LoginService {
    async loginJwt({ email, password }) {
        const loginRepository = new LoginRepository();
        const user = await loginRepository.loginJwt({ email, password });
        if (!user) {
            throw new AppError({
                success: false,
                message: "User not found",
                statusCode: 404,
                errors: ["User not found"],
            });
        }
        if(user.password !== password || user.email !== email) {
            throw new AppError({
                success: false,
                message: "Invalid credentials",
                statusCode: 401,
                errors: ["Invalid credentials"],
            });
        }
        const jwtAuth = new JwtAuth();
        const token = jwtAuth.generateToken({ id: user.id, email: user.email });
        return token;
    }
    async tokenVerify({ token }) {
        if(!token) {
            throw new AppError({
                success: false,
                message: "Token not found",
                statusCode: 401,
                errors: ["Token not found"],
            });
        }
        const splitedToken = token.split(" ");
        const bearer = splitedToken[0];
        if(bearer !== "Bearer") {
            throw new AppError({
                success: false,
                message: "Invalid token",
                statusCode: 401,
                errors: ["Invalid token"],
            });
        }
        token = splitedToken[1];
        const jwtAuth = new JwtAuth();
        const isTokenValid = jwtAuth.checkTokenValidity(token);
        return isTokenValid;
    }
}
