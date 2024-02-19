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
    
    const splitedToken = token.split(" ");
    const bearer = splitedToken[0];
    if (bearer !== "Bearer") {
        throw new AppError({
            success: false,
            message: "Invalid token",
            statusCode: 401,
            errors: ["Invalid token"],
        });
    }
    token = splitedToken[1];
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

    req.token = token;
    req.userId = isTokenValid.id;
    req.userEmail = isTokenValid.email;
    
    next();
}
