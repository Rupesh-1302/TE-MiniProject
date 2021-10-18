class ExpressError extends Error {
  constructor(message, statusCode, redirect = null) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.redirect = redirect;
  }
}

module.exports = ExpressError;
