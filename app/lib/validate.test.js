import { beforeEach, describe, expect, it } from "vitest";
import yup from "yup";
import validate from "./validate.js";

const testSchema = yup.object().shape({
  url: yup.string().trim().url().required(),
});

describe("validate", () => {
  describe("when there are validation errors", () => {
    let validationResult;

    beforeEach(async () => {
      validationResult = await validate(testSchema, { url: "not_an_url" });
    });
    it("returns validation result in the expected format", () => {
      expect(validationResult).toMatchObject({
        errors: { url: ["url must be a valid URL"] },
        values: { url: "not_an_url" },
      });
    });
  });

  describe("when there no are validation errors", () => {
    let validationResult;

    beforeEach(async () => {
      validationResult = await validate(testSchema, {
        url: "http://example.com",
      });
    });
    it("returns validation result in the expected format", () => {
      expect(validationResult).toMatchObject({
        errors: null,
        values: { url: "http://example.com" },
      });
    });
  });
});
