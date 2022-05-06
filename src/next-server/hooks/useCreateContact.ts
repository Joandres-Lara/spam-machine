import fetchWrapper from "@lib/fetch-wrapper";
import { useMutation, useQueryClient } from "react-query";
import useSession from "./useSession";
import apiURL from "@lib/api-url";
import { ContactCreationModel } from "@bot-messages/util-shared";

export default function useCreateContact() {
 const { user } = useSession({
  redirectSign: true,
  redirectRegistred: false,
  redirectSigned: false,
 });

 const queryClient = useQueryClient();
 const { mutate, isLoading, isError } = useMutation(
  (values: ContactCreationModel) =>
   fetchWrapper({
    url: apiURL("/contact/create"),
    data: {
     ...values,
     token: user?.token,
    },
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
