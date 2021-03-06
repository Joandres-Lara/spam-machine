import {
 CronMessageCreateRequest,
 InteractWithDatabaseServer,
} from "@bot-messages/util-shared";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import useSession from "@hooks/useSession";
import { useMutation } from "react-query";
import apiURL from "@lib/api-url";

export default function useCreateCronMessage() {
 const { user } = useSession({
  redirectSign: true,
  redirectRegistred: false,
  redirectSigned: false,
 });

 const { mutateAsync, isLoading, isError } = useMutation(
  "create-message",
  async (values: CronMessageCreateRequest) => {
   const response = await fetchWrapper<
    void,
    InteractWithDatabaseServer<CronMessageCreateRequest>
   >({
    url: apiURL("/cron-messages/create"),
    data: {
     ...values,
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
  create: mutateAsync,
  loading: isLoading,
  error: isError,
 };
}
