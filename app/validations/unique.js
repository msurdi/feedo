const uniqueValidation = ({ model, field, message }) => ({
  name: "unique",
  message: message ?? "Already exists",
  test: async (value) => {
    const instance = await model.findOne({ where: { [field]: value } });
    return !instance;
  },
});

export default uniqueValidation;
