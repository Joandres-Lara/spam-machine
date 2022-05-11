import apiURL from "@lib/api-url";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useMutation } from "react-query";

export default function useUpdateTagsMessageTemplate({
 messageId,
}: {
 messageId: number;
}) {
 const {
  mutate: update,
  isLoading,
  isError,
 } = useMutation("update-tags-message-template", async (tags : number[]) => {
  const response = await fetchWrapper({
   url: apiURL(`/messages/${messageId}`),
   data: tags
  });

  if (response instanceof FetchError) {
   throw response.getOriginal();
  }

  return response;
 });

 return {
  update,
  loading: isLoading,
  error: isError,
 };
}
