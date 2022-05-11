import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useMutation, useQueryClient } from "react-query";
import useSession from "./useSession";
import apiURL from "@lib/api-url";
import {
 InteractWithDatabaseServer,
 ContactCreateRequest,
} from "@bot-messages/util-shared";

export default function useCreateContact() {
 const { user } = useSession({
  redirectSign: true,
  redirectRegistred: false,
  redirectSigned: false,
 });

 const queryClient = useQueryClient();
 const { mutate, isLoading, isError } = useMutation(
  "create-contact",
  async (values: ContactCreateRequest) => {
   const response = await fetchWrapper<
    void,
    InteractWithDatabaseServer<ContactCreateRequest>
   >({
    url: apiURL("/contact/create"),
    data: {
     ...values,
     token: user?.token as string,
    },
   });

   if (response instanceof FetchError) {
    throw response.getOriginal();
   }
  },
  {
   onSuccess() {
    queryClient.invalidateQueries("history-message");
   },
  }
 );

 return {
  create: mutate,
  loading: isLoading,
  error: isError,
 };
}
