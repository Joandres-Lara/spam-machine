export interface FetchWrapperOptions<T> {
 url: string;
 method?: "POST" | "GET";
 data?: T;
 dataType?: "json" | "text" | "blob";
 headers?: Headers;
}

export type DataRequest<T = unknown> = Record<string, T> | T[];

export class FetchError {
 originalError: Error;

 constructor(e?: string | unknown) {
  this.originalError = new Error(
   typeof e !== "string" ? (e instanceof Error ? e.toString() : "Upss") : e
  );
 }

 getOriginal() {
  return this.originalError;
 }
}

function filterDataUrlSearchParams(
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 data: DataRequest<any>
): string[][] | Record<string, string> {
 if (Array.isArray(data)) {
  return data.filter(Boolean).map((value, i) => [i, value.toString()]);
 } else {
  return Object.fromEntries(
   Object.entries(data)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([key, value]) => [key, value.toString()])
  );
 }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterDataJson(data: DataRequest<any>): DataRequest<any> {
 if (Array.isArray(data)) {
  return data.filter(Boolean);
 } else {
  return Object.fromEntries(
   Object.entries(data).filter(
    ([, value]) => value !== null && value !== undefined
   )
  );
 }
}

export default async function fetchWrapper<
 R = unknown | FetchError,
 D extends DataRequest = Record<string, never>
>({
 url,
 method = "POST",
 headers,
 data,
 dataType = "json",
}: FetchWrapperOptions<D>) {
 try {
  let response;
  if (method === "GET") {
   if (data) {
    const params = new URLSearchParams(filterDataUrlSearchParams(data));
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
    body: JSON.stringify(filterDataJson(data || {})),
   });
  }

  const dataResponse = await response[dataType]();

  if (response.status > 400) {
   throw new Error((dataResponse as { error: string }).error);
  }

  return dataResponse as R;
 } catch (e) {
  return new FetchError(e);
 }
}
