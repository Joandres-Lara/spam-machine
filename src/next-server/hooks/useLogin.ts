import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { UserModel } from "@bot-messages/util-shared";

export default function useLogin() {
 const router = useRouter();

 return useCallback(
  async ({ username, password }: { username: string; password: string }) => {
   const data = await fetchWrapper({
    url: "/api/auth/login",
    data: { username, password },
   });

   if (data instanceof FetchError) {
    throw data.getOriginal();
   }

   if ((data as { user: UserModel | null }).user) {
    router.push("/dashboard");
    return;
   }

   throw new Error("Failed login");
  },
  []
 );
}
