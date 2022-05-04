import "@styles/global.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "contexts/session-context";
import { QueryClientProvider, QueryClient } from "react-query";
import { SharedStateProvider } from "@contexts/shared-state-context";
import ObservableCache from "@lib/observable-cache";

const queryClient = new QueryClient();
const cacheObservable = new ObservableCache();

export default function App({ Component, pageProps }: AppProps) {
 return (
  <SharedStateProvider cache={cacheObservable}>
   <QueryClientProvider client={queryClient}>
    <SessionProvider>
     <Component {...pageProps} />
    </SessionProvider>
   </QueryClientProvider>
  </SharedStateProvider>
 );
}
