class ApiError extends Error {
    constructor(statusCode, message) {
      super();
      this.message = message;
      this.name = this.constructor.name;
      this.statusCode = statusCode;
    }
}
  
module.exports = ApiError;