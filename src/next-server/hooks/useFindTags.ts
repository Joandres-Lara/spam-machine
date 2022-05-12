import { useMutation } from "react-query";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import apiURL from "@lib/api-url";
import useUser from "@hooks/useUser";
import {
 InteractWithDatabaseServer,
 TagModel,
 TagFindRequest,
} from "@bot-messages/util-shared";

export default function useFindTags() {
 const user = useUser();

 const { mutateAsync, data, isLoading, isSuccess, isError } = useMutation<
  TagModel[],
  unknown,
  TagFindRequest
 >("finded-tags", async (queries) => {
  const response = await fetchWrapper<
   TagModel[],
   InteractWithDatabaseServer<TagFindRequest>
  >({
   url: apiURL("/tags/find"),
   data: {
    ...queries,
    token: user?.token as string,
   },
  });

  if (response instanceof FetchError) {
   throw response.getOriginal();
  }

  return response;
 });

 return {
  find: mutateAsync,
  loading: isLoading,
  error: isError,
  success: isSuccess,
  tags: data,
 };
}
