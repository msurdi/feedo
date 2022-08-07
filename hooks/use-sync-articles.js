import { milliseconds } from "date-fns";
import { useIdle, useInterval, useMount, useNetworkState } from "react-use";
import { sync } from "../lib/store/articles.js";
import useHandler from "./use-handler.js";

const useSyncArticles = ({ onSynced } = {}) => {
  const networkState = useNetworkState();
  const isIdle = useIdle();
  const isRunning = networkState.online && !isIdle;

  const syncHandler = useHandler(async () => {
    await sync();
    onSynced?.();
  });

  useMount(syncHandler);

  useInterval(syncHandler, isRunning ? milliseconds({ minutes: 1 }) : null);
};

export default useSyncArticles;
