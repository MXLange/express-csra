import LoginRepository from "./LoginRepository.js";
import JwtAuth from "../shared/classes/JwtAuth.js";

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
        const jwtAuth = new JwtAuth();
        return jwtAuth.checkTokenValidity(token);
    }
}
