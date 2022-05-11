import {
 InteractWithDatabaseServer,
 SendingMessage,
} from "@bot-messages/util-shared";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useQuery } from "react-query";
import apiURL from "@lib/api-url";
import useSession from "./useSession";

export default function useSendingMessagesContact({
 contactId,
}: {
 contactId?: number;
}) {
 const { user } = useSession({
  redirectSign: true,
  redirectRegistred: false,
  redirectSigned: false,
 });

 const {
  data: messages,
  isLoading,
  isError,
 } = useQuery<SendingMessage[]>(
  "messages-list",
  async () => {
   if (contactId === null || contactId === undefined) {
    throw new Error("Invalid contact id");
   }

   if (user?.token === null || user?.token === undefined) {
    throw new Error("Invalid token");
   }

   const response = await fetchWrapper<
    SendingMessage[],
    InteractWithDatabaseServer<{ contact_id: number }>
   >({
    url: apiURL("/sending-messages"),
    method: "GET",
    data: {
     contact_id: contactId,
     token: user?.token,
    },
   });

   if (response instanceof FetchError) {
    throw response.getOriginal();
   } else {
    return response;
   }
  },
  {
   enabled: !!contactId && !!user?.token,
  }
 );

 return {
  messages,
  loading: isLoading,
  error: isError,
 };
}
