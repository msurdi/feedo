import { forwardRef } from "react";

const Input = ({ type = "text", required, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 placeholder-gray-400 focus:border-primary focus:bg-white focus:outline-none"
    required={required}
    {...props}
  />
);

export default forwardRef(Input);
