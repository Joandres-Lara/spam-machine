import useSelectedHistoryContact from "./useSelectedHistoryContact";
import { ContactModel, normalTransformer } from "@bot-messages/util-shared";
import useSession from "./useSession";
import { useCallback } from "react";

export default function useTransformContentMessage() {
 const { contact: selectedContact } = useSelectedHistoryContact();
 const { user } = useSession({
  redirectSign: true,
  redirectSigned: false,
  redirectRegistred: false,
 });

 return useCallback(
  (content: { text: string }) =>
   normalTransformer(content.text, {
    contact: (selectedContact as ContactModel) || {
     name: "",
    },
    at: new Date(),
    user: user || { username: "" },
   }),
  [selectedContact, user]
 );
}
