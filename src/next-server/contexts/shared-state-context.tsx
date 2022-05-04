import { createContext, ReactNode, useCallback } from "react";
import ObservableCache from "@lib/observable-cache";

type DispatchValue = (key: string, value: unknown) => void;

const contextSharedState = createContext({
 state: new ObservableCache(),
 // eslint-disable-next-line @typescript-eslint/no-empty-function
 dispatch: (() => {}) as DispatchValue,
});

function SharedStateProvider({
 children,
 cache,
}: {
 children: ReactNode;
 cache: ObservableCache;
}) {
 const dispatchMemoize = useCallback(
  (key: string, value: unknown) => {
   cache.set(key, value);
  },
  [cache]
 );

 return (
  <contextSharedState.Provider
   value={{
    state: cache,
    dispatch: dispatchMemoize,
   }}
  >
   {children}
  </contextSharedState.Provider>
 );
}

export { SharedStateProvider, contextSharedState as context };
