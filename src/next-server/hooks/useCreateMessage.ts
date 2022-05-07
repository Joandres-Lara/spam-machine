import { MessageCreationModel } from "@bot-messages/util-shared";
import fetchWrapper from "@lib/fetch-wrapper";
import { useMutation } from "react-query";

export default function useCreateMessage() {
 const { mutate, isLoading, isError } = useMutation(
  "create-message",
  async (values: MessageCreationModel) => {
   const response = await fetchWrapper({
    url: "/messages/create",
    data: values,
   });
  }
 );

 return {
  create: mutate,
  loading: isLoading,
  error: isError,
 };
}
