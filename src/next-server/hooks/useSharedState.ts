import { context } from "@contexts/shared-state-context";
import { useCallback, useContext, useEffect, useState } from "react";

export default function useSharedState(key: string) {
 const { state } = useContext(context);
 const [value, setValue] = useState(() => state.get(key));
 const subscriptor = useCallback((...[, newValue]: [string, unknown]) => {
  setValue(newValue);
 }, []);

 const setValueHibrid = useCallback(
  (newValue: unknown) => {
   state.set(key, newValue);
  },
  [key, state]
 );

 useEffect(() => {
  return state.subscribe(key, state.createSubscriber(subscriptor));
 }, [subscriptor, state, key]);

 return [value, setValueHibrid];
}
