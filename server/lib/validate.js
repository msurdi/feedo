const { ValidationError } = require("yup");

const mapYupErrors = (yupError) => {
  const errorsMap = {};
  for (const error of yupError.inner) {
    errorsMap[error.path] = [...(errorsMap[error.path] ?? []), error.message];
  }
  return errorsMap;
};

const validate = async (schema, values) => {
  try {
    const validValues = await schema.validate(values, { abortEarly: false });
    return { values: validValues, errors: null };
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = mapYupErrors(err);
      return { values, errors };
    }
    throw err;
  }
};

module.exports = validate;
