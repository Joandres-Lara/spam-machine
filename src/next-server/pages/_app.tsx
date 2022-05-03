import "@styles/global.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "contexts/session-context";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
 return (
  <QueryClientProvider client={queryClient}>
   <SessionProvider>
    <Component {...pageProps} />
   </SessionProvider>
  </QueryClientProvider>
 );
}
