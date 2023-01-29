// eslint-disable-next-line import/prefer-default-export
class ValidationError extends Error {
  constructor(errors) {
    super("Validation error");
    this.name = "ValidationError";
    this.errors = errors;
  }
}

module.exports = { ValidationError };
