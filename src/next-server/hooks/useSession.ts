import { FetchError } from "@lib/fetch-wrapper";
import { sessionContext } from "contexts/session-context";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";

export default function useSession({
 redirect = true,
}: { redirect?: boolean } = {}) {
 const { user, refresh } = useContext(sessionContext);
 const router = useRouter();

 useEffect(() => {
  refresh().then((user) => {
   if (user instanceof FetchError) {
    console.error(user.getOriginal());
   }

   if (redirect) {
    if (user) {
     router.push("/signin");
    } else {
     router.push("/register");
    }
   }
  });
 }, []);

 return {
  user,
  refresh
 };
}
