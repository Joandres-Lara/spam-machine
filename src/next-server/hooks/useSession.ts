import { FetchError } from "@lib/fetch-wrapper";
import { sessionContext } from "contexts/session-context";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react";

export default function useSession({
 redirect = true,
 redirectRegistred = false,
 redirectSigned = true,
 redirectSign = true
}: {
 redirect?: boolean;
 redirectSigned?: boolean;
 redirectRegistred?: boolean;
 redirectSign?:boolean
} = {}) {
 const { user, refresh } = useContext(sessionContext);
 const router = useRouter();

 useEffect(() => {
  refresh().then((user) => {
   if (user instanceof FetchError) {
    throw user.getOriginal();
   }

   if (redirect) {
    if (user) {
     if(redirectSigned){
      router.push("/dashboard");
     }
    } else if(redirectSign){
     router.push("/signin");
    } else if(redirectRegistred) {
     router.push("/register");
    }
   }
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 return {
  user,
  refresh,
 };
}
