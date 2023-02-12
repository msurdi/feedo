/* eslint-disable max-classes-per-file */
export class ValidationError extends Error {
  constructor() {
    super("Validation error");
    this.name = "ValidationError";
    this.errors = {};
  }

  add(field, message) {
    this.errors[field] ||= [];
    this.errors[field].push(message);
    return this;
  }
}

export class NotFoundError extends Error {
  constructor() {
    super("Not found");
    this.name = "NotFoundError";
  }
}
