import classNames from "classnames";
import { forwardRef, useId } from "react";
import Input from "./input.jsx";

const InputField = (
  { label, className, labelClassName, error, ...props },
  ref
) => {
  const id = useId();

  return (
    <fieldset className={classNames("m-2 flex flex-col md:flex", className)}>
      <label
        htmlFor={id}
        className={classNames("py-1 text-sm font-bold", labelClassName)}
      >
        {label}
      </label>
      <Input id={id} ref={ref} {...props} />
      {error && <span className="text-sm text-danger">{error}</span>}
    </fieldset>
  );
};

export default forwardRef(InputField);
