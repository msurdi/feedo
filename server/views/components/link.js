const html = require("html-string");

const variants = {
  button: Symbol("button"),
  normal: Symbol("normal"),
};

const getClassesForVariant = (variant) => {
  switch (variant) {
    case variants.button:
      return "my-4 w-auto py-2 rounded transition-colors duration-200 border-gray-400 disabled:bg-gray-500 shadow inline-flex items-center justify-center px-4 text-white bg-success hover:bg-success-light";
    default:
      return "";
  }
};

const link = ({ variant = variants.normal, classes, children, ...attrs }) => {
  const linkClasses = `${getClassesForVariant(variant)} ${classes}`;

  return html`<a class="${linkClasses}" ${attrs}:attrs>${children}</a>`;
};

link.variants = variants;

module.exports = link;
