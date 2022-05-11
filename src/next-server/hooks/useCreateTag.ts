import apiURL from "@lib/api-url";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import {
 InteractWithDatabaseServer,
 TagModel,
 TagCreateRequest,
} from "@bot-messages/util-shared";
import { useMutation } from "react-query";
import useSession from "./useSession";

export default function useCreateTag() {
 const { user } = useSession({
  redirectSign: true,
  redirectRegistred: false,
  redirectSigned: false,
 });

 const { mutateAsync, isLoading, isError } = useMutation(
  "create-tag",
  async (values: TagCreateRequest) => {
   if (user?.token === undefined || user.token === null) {
    throw new Error("No user token");
   }

   const response = fetchWrapper<
    TagModel,
    InteractWithDatabaseServer<TagCreateRequest>
   >({
    url: apiURL("/tags/create"),
    data: {
     ...values,
     token: user.token,
    },
   });

   if (response instanceof FetchError) {
    throw response.getOriginal();
   }

   return response;
  }
 );

 return {
  create: mutateAsync,
  loading: isLoading,
  error: isError,
 };
}
