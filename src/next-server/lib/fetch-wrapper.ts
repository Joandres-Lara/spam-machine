interface FetchWrapperOptions {
 url: string;
 method?: "POST" | "GET";
 data?: unknown;
 dataType?: "json" | "text" | "blob";
 headers?: Headers;
}

export class FetchError {
 originalError: Error;

 constructor(e?: string | unknown) {
  this.originalError = new Error(typeof e !== "string" ? "Upsss" : e);
 }

 getOriginal() {
  return this.originalError;
 }
}

export default async function fetchWrapper<T = unknown | FetchError>({
 url,
 method = "POST",
 headers,
 data,
 dataType = "json",
}: FetchWrapperOptions) {
 try {
  let response;
  if (method === "GET") {
   // TODO: Check data type
   if (data) {
    const params = new URLSearchParams(data as Record<string, string>);
    response = await fetch(`${url}?${params.toString()}`, { method, headers });
   } else {
    response = await fetch(url, { method, headers });
   }
  } else {
   const defaultHeaders = new Headers();
   defaultHeaders.append("Content-Type", "application/json; charset=UTF-8");

   response = await fetch(url, {
    method,
    headers: defaultHeaders,
    body: JSON.stringify(data),
   });
  }

  const dataResponse = await response[dataType]();

  if (response.status > 400) {
   throw new Error((dataResponse as { error: string }).error);
  }

  return dataResponse as T;
 } catch (e) {
  return new FetchError(e);
 }
}
