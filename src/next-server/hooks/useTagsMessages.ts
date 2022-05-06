import { TagsMessages } from "@interfaces/types";
import apiURL from "@lib/api-url";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useQuery } from "react-query";
import useSession from "./useSession";

export default function useTagsMessages() {
 const { user } = useSession({
  redirectSigned: false,
 });

 const { data, isLoading, isError } = useQuery<TagsMessages[]>(
  "tags-messages",
  async () => {
   const response = await fetchWrapper<TagsMessages[]>({
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
  }
 );

 return {
  tags: data,
  loading: isLoading,
  error: isError,
 };
}
