import { useCallback } from "react";
import {useRouter} from "next/router";
import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { UserModel } from "@bot-messages/util-shared";

export default function useRegister() {
 const router = useRouter();

 return useCallback(
  async (values: {
   username: string;
   password: string;
   password_confirm: string;
  }) => {
   const data = await fetchWrapper({
    url: "/api/auth/register",
    method: "POST",
    data: values,
   });

   if(data instanceof FetchError){
    console.error(data.getOriginal());
    return;
   }

   if((data as {user: UserModel | null}).user){
    router.push("/dashboard");
   }
  },
  []
 );
}
