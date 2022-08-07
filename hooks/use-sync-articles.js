import { milliseconds } from "date-fns";
import { useCallback, useEffect, useRef } from "react";
import { useIdle, useInterval, useNetworkState } from "react-use";
import { sync } from "../lib/store/articles.js";

const useSyncArticles = ({ onSynced } = {}) => {
  const networkState = useNetworkState();
  const isIdle = useIdle();
  const isRunning = networkState.online && !isIdle;
  const onSyncedRef = useRef();

  useEffect(() => {
    onSyncedRef.current = onSynced;
  }, [onSynced]);

  const syncArticles = useCallback(async () => {
    await sync();
    onSyncedRef.current?.();
  }, []);

  useEffect(() => {
    syncArticles();
  }, [syncArticles]);

  useInterval(syncArticles, isRunning ? milliseconds({ minutes: 1 }) : null);
};

export default useSyncArticles;
