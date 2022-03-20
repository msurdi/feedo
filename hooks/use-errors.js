import { useEffect } from "react";

const useErrors = (cb, errors) => {
  useEffect(() => {
    if (errors) {
      Object.keys(errors).forEach((field) => {
        cb(field, { type: "server", message: errors[field] });
      });
    }
  }, [cb, errors]);
};

export default useErrors;
