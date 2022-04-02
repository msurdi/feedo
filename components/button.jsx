import cn from "classnames";
import { forwardRef } from "react";

const variants = {
  danger: Symbol("danger"),
};

const getClassesForVariant = (variant) => {
  switch (variant) {
    case variants.danger:
      return cn(
        "my-4 w-auto py-2 text-danger text-sm background-transparent font-bold uppercase outline-none focus:outline-none ease-linear disabled:text-gray-400"
      );
    default:
      return cn(
        "py-2 px-6 rounded transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none shadow text-white hover:bg-success-light bg-success"
      );
  }
};

const ButtonWithRef = ({ variant, type = "button", children }, ref) => {
  const className = cn(
    "focus:active:scale-95 shadow-none transition-transform ease-out",
    getClassesForVariant(variant)
  );

  return (
    <button
      ref={ref}
      type={type === "button" ? "button" : "submit"}
      className={className}
    >
      {children}
    </button>
  );
};

const Button = forwardRef(ButtonWithRef);

Button.variants = variants;

export default Button;
