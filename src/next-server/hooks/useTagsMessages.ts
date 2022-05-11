import { InteractWithDatabaseServer } from "@bot-messages/util-shared";
import { TagMessages } from "@interfaces/types";
import apiURL from "@lib/api-url";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useQuery } from "react-query";
import useSession from "./useSession";

export default function useTagsMessages() {
 const { user } = useSession({
  redirectSigned: false,
 });

 const { data, isLoading, isError } = useQuery<TagMessages[]>(
  "tags-messages",
  async () => {
   if (user?.token === null || user?.token === undefined) {
    throw new Error("Invalid user token");
   }

   const response = await fetchWrapper<
    TagMessages[],
    InteractWithDatabaseServer
   >({
    url: apiURL("/tags-messages"),
    method: "GET",
    data: {
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
   enabled: !!user?.token,
   refetchOnWindowFocus: false
  }
 );

 return {
  tags: data,
  loading: isLoading,
  error: isError,
 };
}
