import { useEffect } from "react";

const useSuccess = (cb, result) => {
  useEffect(() => {
    if (!result) {
      return;
    }
    cb();
  }, [cb, result]);
};
export default useSuccess;
