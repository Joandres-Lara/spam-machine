import { InteractWithDatabaseServer } from "@bot-messages/util-shared";
import { HistoryMessage } from "@interfaces/types";
import apiURL from "@lib/api-url";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useQuery } from "react-query";
import useSession from "./useSession";

export default function useHistoryContactLastMessage() {
 const { user } = useSession({
  redirectSigned: false,
 });

 const {
  data: historyMessages,
  isLoading,
  isError,
 } = useQuery<HistoryMessage[], Error>(
  "history-contacts-messages",
  async () => {
   const response = await fetchWrapper<
    HistoryMessage[],
    InteractWithDatabaseServer
   >({
    url: apiURL("/history-contacts-messages"),
    method: "GET",
    data: {
     token: user?.token as string,
    },
   });

   if (response instanceof FetchError) {
    throw response.getOriginal();
   } else {
    return response;
   }
  },
  {
   enabled: !!user?.token,
  }
 );

 return {
  historyMessages,
  loading: isLoading,
  error: isError,
 };
}
