import fetchWrapper, { FetchError } from "@lib/fetch-wrapper";
import { useCallback } from "react";

export default function useLogin() {
 return useCallback(async (values: { username: string; password: string }) => {
  const dataToken = await fetchWrapper<{ csrfToken: string }>({
   url: "/api/auth/csrf",
   method: "GET",
   data: null,
  });

  if (dataToken instanceof FetchError) {
   throw new Error(dataToken.getOriginal() as string);
  }

  const data = await fetchWrapper({
   url: "/api/auth/callback/credentials",
   data: { ...values, csrfToken: dataToken.csrfToken },
  });

  console.log({ data });
 }, []);
}
