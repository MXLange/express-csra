import AppError from "../classes/AppError.js";
import AppResponse from "../classes/AppResponse.js";

export function errorMiddleware(error, req, res, next) {
    let response = {};
    if(error instanceof AppError) {
        response = new AppResponse({
            success: error.success,
            result: null,
            errors: error.errors,
        }); 
        return res.status(error.statusCode).json(response);
    }

    response = new AppResponse({
        success: false,
        result: null,
        errors: ["Erro interno do servidor"]
    });
    
    return res.status(500).json(response);
}