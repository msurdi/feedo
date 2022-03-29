import { useRouter } from "next/router";
import nprogress from "nprogress";
import { useEffect } from "react";

nprogress.configure({ showSpinner: false });

let timer;
const start = () => {
  timer = setTimeout(() => {
    nprogress.start();
  }, 500);
};
const stop = () => {
  clearTimeout(timer);
  nprogress.done();
};

const useProgress = () => {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", stop);
    router.events.on("routeChangeError", stop);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", stop);
      router.events.off("routeChangeError", stop);
    };
  }, [router]);
};

export default useProgress;
