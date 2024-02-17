export default class AppError extends Error {
    constructor({ success, message = "", statusCode, errors = [] }) {
        super(message);
        
        this.success = success;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
