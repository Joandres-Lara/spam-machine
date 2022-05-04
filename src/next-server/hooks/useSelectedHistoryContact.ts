import useSharedState from "./useSharedState";
import { SelectedHistoryContact } from "@interfaces/types";

export default function useSelectedHistoryContact() {
 const [selectedContact] = useSharedState<null | SelectedHistoryContact>(
  "select-history-contact",
  {
   defaultValue: null,
  }
 );
 return selectedContact;
}
