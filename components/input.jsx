import { forwardRef } from "react";

const Input = ({ type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 font-normal leading-tight text-gray-700 placeholder-gray-400 focus:border-primary focus:bg-white focus:outline-none"
    {...props}
  />
);

export default forwardRef(Input);
