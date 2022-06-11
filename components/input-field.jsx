import { forwardRef } from "react";
import Input from "./input.jsx";

const InputField = ({ label, error, ...props }, ref) => (
  <fieldset className="m-2 flex flex-col md:flex">
    <label className="py-1 text-sm font-bold">
      {label}
      <Input ref={ref} {...props} />
    </label>
    {error && <span className="text-sm text-danger">{error}</span>}
  </fieldset>
);

export default forwardRef(InputField);
