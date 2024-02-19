import LoginService from "../../domains/login/LoginService.js";

export async function authMiddleware(req, res, next) {
    const token = req.headers["authorization"];
    if (!token) {
        throw new AppError({
            success: false,
            message: "Token not provided",
            statusCode: 401,
            errors: ["Token not provided"],
        });
    }
    
    [bearer, token] = token.split(" ");
    
    if (bearer !== "Bearer") {
        throw new AppError({
            success: false,
            message: "Invalid token",
            statusCode: 401,
            errors: ["Invalid token"],
        });
    }
    
    const loginService = new LoginService();
    const isTokenValid = await loginService.tokenVerify({ token });
    
    if (!isTokenValid) {
        throw new AppError({
            success: false,
            message: "Invalid token",
            statusCode: 401,
            errors: ["Invalid token"],
        });
    }
    next();
}
