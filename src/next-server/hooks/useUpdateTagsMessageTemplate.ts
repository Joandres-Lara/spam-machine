import apiURL from "@lib/api-url";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useMutation } from "react-query";
import {
 InteractWithDatabaseServer,
 TagsMessagesToggleRequest,
} from "@bot-messages/util-shared";
import { MessageTags } from "@interfaces/types";
import useUser from "./useUser";

export default function useUpdateTagsMessageTemplate({
 messageId,
}: {
 messageId: number;
}) {
 const user = useUser();

 const {
  mutateAsync: update,
  isLoading,
  isError,
 } = useMutation<MessageTags, unknown, number[]>(
  "update-tags-message-template",
  async (tags: number[]) => {
   const response = await fetchWrapper<
    MessageTags,
    InteractWithDatabaseServer<TagsMessagesToggleRequest>
   >({
    url: apiURL(`/messages/${messageId}`),
    data: {
     toggle: tags,
     token: user?.token as string,
    },
   });

   if (response instanceof FetchError) {
    throw response.getOriginal();
   }

   return response;
  }
 );

 return {
  update,
  loading: isLoading,
  error: isError,
 };
}
