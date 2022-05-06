import { createContext, ReactNode, useState, useCallback } from "react";
import { UserModel } from "@bot-messages/util-shared";
import { FetchError, default as fetchWrapper } from "@lib/fetch-wrapper";

export const sessionContext = createContext({
 user: null as null | UserModel,
 async refresh(): Promise<UserModel | FetchError> {
  return new FetchError("Canot update model");
 },
});

export function SessionProvider({ children }: { children: ReactNode }) {
 const [user, setUser] = useState<null | UserModel>(null);

 const refresh = useCallback(async () => {
  if (user === null || user === undefined || (user && !user.token)) {
   const data = await fetchWrapper<{ user: UserModel }>({
    url: "/api/auth/session",
   });

   if (data instanceof FetchError) {
    setUser(null);
    return data;
   } else {
    setUser(data.user);
    return data.user;
   }
  } else {
   return user;
  }
 }, [user]);

 return (
  <sessionContext.Provider value={{ user, refresh }}>
   {children}
  </sessionContext.Provider>
 );
}
