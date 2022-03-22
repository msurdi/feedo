import { useRouter } from "next/router";
import { useCallback } from "react";

const useRefresh = () => {
  const router = useRouter();

  const refresh = useCallback(
    ({ scroll = false } = {}) => {
      router.replace(router.asPath, null, { scroll });
    },
    [router]
  );

  return refresh;
};

export default useRefresh;
