import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useCallback } from "react";
import { useRouter } from "next/router";

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

   if ((data as { user: any | null }).user) {
    router.push("/dashboard");
    return;
   }

   throw new Error("Failed login");
  },
  []
 );
}
