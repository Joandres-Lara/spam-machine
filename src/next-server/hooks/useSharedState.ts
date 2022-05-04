import { context } from "@contexts/shared-state-context";
import { useCallback, useContext, useEffect, useState } from "react";

export default function useSharedState<T = unknown>(
 key: string,
 { defaultValue }: { defaultValue: T }
): [T, (newValue: T) => void] {
 const { state } = useContext(context);
 const [value, setValue] = useState(() => state.get(key, defaultValue));
 const subscriptor = useCallback((...[, newValue]: [string, T]) => {
  setValue(newValue);
 }, []);

 const setValueHibrid = useCallback(
  (newValue: T) => {
   state.set(key, newValue);
  },
  [key, state]
 );

 useEffect(() => {
  return state.subscribe(key, state.createSubscriber(subscriptor));
 }, [subscriptor, state, key]);

 return [value, setValueHibrid];
}
