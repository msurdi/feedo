import { forwardRef } from "react";

const Input = ({ type = "text", required, ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className="w-full px-4 py-2 leading-tight text-gray-700 placeholder-gray-400 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-primary"
    required={required}
    {...props}
  />
);

export default forwardRef(Input);
