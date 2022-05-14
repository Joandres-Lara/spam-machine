import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useMutation, useQueryClient } from "react-query";
import useUser from "./useUser";
import apiURL from "@lib/api-url";
import {
 InteractWithDatabaseServer,
 ContactCreateRequest,
 ContactModel,
} from "@bot-messages/util-shared";

export default function useCreateContact() {
 const user = useUser();

 const queryClient = useQueryClient();
 const { mutateAsync, isLoading, isError } = useMutation(
  "create-contact",
  async (values: ContactCreateRequest) => {
   const response = await fetchWrapper<
    ContactModel,
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

   return response;
  },
  {
   onSuccess() {
    queryClient.invalidateQueries("history-message");
   },
  }
 );

 return {
  create: mutateAsync,
  loading: isLoading,
  error: isError,
 };
}
