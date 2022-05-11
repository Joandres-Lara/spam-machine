import { MessageCreationModel } from "@bot-messages/util-shared";
import apiURL from "@lib/api-url";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useMutation } from "react-query";

export default function useUpdateMessageTemplate({
 messageId,
}: {
 messageId?: number;
}) {
 const { mutate, isLoading, isError } = useMutation(
  "update-message-template",
  async (values: MessageCreationModel) => {

   if(!messageId){
    throw new Error("Invalid id");
   }

   const response = await fetchWrapper({
    url: apiURL(`/messages/${messageId}`),
    data: values,
   });

   if (response instanceof FetchError) {
    throw response.getOriginal();
   }

   return response;
  }
 );

 return {
  update: mutate,
  loading: isLoading,
  error: isError,
 };
}
