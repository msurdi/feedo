import { useCallback, useRef } from "react";

const useHandler = (fn) => {
  const ref = useRef();
  ref.current = fn;
  return useCallback((...args) => {
    ref.current(...args);
  }, []);
};

export default useHandler;
