import {
 InteractWithDatabaseServer,
 MessageCreationModel,
} from "@bot-messages/util-shared";
import { MessageTags } from "@interfaces/types";
import apiURL from "@lib/api-url";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useMutation } from "react-query";
import useSession from "./useSession";

export default function useCreateMessageTemplate() {
 const { user } = useSession({
  redirectSign: true,
  redirectRegistred: false,
  redirectSigned: false,
 });

 const { mutateAsync, data, isLoading, isError } = useMutation<
  MessageTags,
  unknown,
  MessageCreationModel
 >("new-message-template", async (values: MessageCreationModel) => {
  if (user?.token === undefined || user.token === null) {
   throw new Error("Invalid token");
  }

  const response = await fetchWrapper<
   MessageTags,
   InteractWithDatabaseServer<MessageCreationModel>
  >({
   url: apiURL("/messages/create"),
   data: {
    ...values,
    token: user.token,
   },
  });

  if (response instanceof FetchError) {
   throw response.getOriginal();
  }

  return response;
 });

 return {
  create: mutateAsync,
  message_created: data,
  loading: isLoading,
  error: isError,
 };
}
