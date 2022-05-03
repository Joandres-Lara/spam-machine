import fetchWrapper from "@lib/fetch-wrapper";
import { useMutation, useQueryClient } from "react-query";
import apiURL from "@lib/api-url";
import { ContactCreationModel } from "@bot-messages/util-shared";
import { InteractWithDatabaseServer } from "@interfaces/types";

export default function useCreateContact() {
 const queryClient = useQueryClient();
 const { mutate, isLoading, isError } = useMutation(
  (values: InteractWithDatabaseServer<ContactCreationModel>) =>
   fetchWrapper({
    url: apiURL("/contact/create"),
    data: values,
   }),
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
