import { beforeEach, describe, expect, it } from "vitest";
import yup from "yup";
import { ValidationError } from "../exceptions.js";
import validate from "./validate.js";

const testSchema = yup.object().shape({
  url: yup.string().trim().url().required(),
});

describe("validate", () => {
  describe("when there are validation errors", () => {
    let validationResult;

    beforeEach(() => {
      validationResult = validate(testSchema, { url: "not_an_url" });
    });

    it("throws a validation error", async () => {
      await expect(validationResult).rejects.toThrowError(ValidationError);
    });

    it("validation error contains field error messages", async () => {
      await expect(validationResult).rejects.toHaveProperty("errors", {
        url: ["url must be a valid URL"],
      });
    });
  });

  describe("when there no are validation errors", () => {
    let validationResult;

    beforeEach(async () => {
      validationResult = validate(testSchema, {
        url: "http://example.com",
      });
    });

    it("returns validation result in the expected format", async () => {
      await expect(validationResult).resolves.not.toThrow();
    });
  });
});
