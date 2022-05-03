import { HistoryMessage } from "@interfaces/types";
import apiURL from "@lib/api-url";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useQuery } from "react-query";

export default function useHistoryContactLastMessage() {
 const { data, isLoading, isError } = useQuery<HistoryMessage[], Error>(
  "history-messages",
  async () => {
   const response = await fetchWrapper<HistoryMessage[]>({
    url: apiURL("/history-messages"),
    method: "GET",
   });

   if (response instanceof FetchError) {
    throw response.getOriginal();
   } else {
    return response;
   }
  }
 );

 return {
  data,
  loading: isLoading,
  error: isError,
 };
}
