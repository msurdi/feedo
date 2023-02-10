/* eslint-disable import/no-extraneous-dependencies,global-require */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./app/views/**/*.js"],
  theme: {
    colors: {
      // primary: colors.purple[900],
      primary: colors.purple[900],
      "primary-light": colors.purple[700],
      black: colors.black,
      purple: colors.purple,
      white: colors.white,
      gray: colors.gray,
      danger: colors.red[700],
      "danger-light": colors.red[600],
      success: colors.green[700],
      "success-light": colors.green[600],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
