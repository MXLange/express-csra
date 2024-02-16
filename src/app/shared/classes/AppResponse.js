export default class AppResponse {
    constructor(success, result, errors = []) {
        this.success = success;
        this.result = result;
        this.errors = errors;
    }
}