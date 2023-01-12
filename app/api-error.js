class ApiError extends Error {
    constructor(statusCode, message){
        supper();
        this.statusCode = statusCode;
        this.message = message;
    }
}

module.exports = ApiError;