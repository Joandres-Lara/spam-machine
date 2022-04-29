import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function useSession({ redirect = true }: { redirect: boolean }) {
 const router = useRouter();

 useEffect(() => {
  fetchWrapper({ url: "/api/auth/session" }).then((data) => {
   if (data instanceof FetchError) {
    console.error(data.getOriginal());
   }

   if (!(data as { user: any | null }).user) {
    if (redirect) {
     router.push("/sigin");
    }
   }
  });
 }, []);
}
