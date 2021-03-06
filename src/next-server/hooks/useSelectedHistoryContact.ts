import useSharedState from "./useSharedState";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { SelectedHistoryContact } from "@interfaces/types";
import { useQuery } from "react-query";
import useSession from "./useSession";
import apiURL from "@lib/api-url";
import { useEffect } from "react";
import { InteractWithDatabaseServer } from "@bot-messages/util-shared";

export default function useSelectedHistoryContact() {
 const { user } = useSession({
  redirectSign: true,
  redirectRegistred: false,
  redirectSigned: false,
 });

 const [selectedContactId, setSelectedContactId] = useSharedState<
  null | number
 >("select-history-contact", {
  defaultValue: null,
 });

 const {
  data: selectedContactWithMessages = null,
  isLoading,
  isError,
  refetch,
 } = useQuery<SelectedHistoryContact>(
  "selected-history-contact",
  async () => {
   if (user?.token === undefined || user?.token === null) {
    throw new Error("Invalid user token");
   }

   if (selectedContactId === undefined || selectedContactId === null) {
    throw new Error("Invalid selectedContactId");
   }

   const response = await fetchWrapper<
    SelectedHistoryContact,
    InteractWithDatabaseServer<{ contact_id: number }>
   >({
    url: apiURL("/contact-messages"),
    method: "GET",
    data: {
     token: user?.token,
     contact_id: selectedContactId,
    },
   });

   if (response instanceof FetchError) {
    throw response.getOriginal();
   } else {
    return response;
   }
  },
  { enabled: !!user?.token && !!selectedContactId }
 );

 useEffect(() => {
  if (selectedContactId) {
   refetch();
  }
 }, [selectedContactId, refetch]);

 return {
  contact: selectedContactWithMessages,
  setContactId: setSelectedContactId,
  loading: isLoading,
  error: isError,
 };
}
