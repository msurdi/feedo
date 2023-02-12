import { ValidationError as YupValidationError } from "yup";
import { ValidationError } from "../exceptions.js";

const validate = async (schema, values) => {
  try {
    const validated = await schema.validate(values, { abortEarly: false });
    return validated;
  } catch (err) {
    if (err instanceof YupValidationError) {
      const validationError = new ValidationError();
      for (const error of err.inner) {
        validationError.add(error.path, error.message);
      }
      throw validationError;
    }
    throw err;
  }
};

export default validate;
