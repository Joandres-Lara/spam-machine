import "@styles/global.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "contexts/session-context";
import {
 ApolloProvider,
 ApolloClient,
 createHttpLink,
 InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
 cache: new InMemoryCache(),
 link: createHttpLink({
  uri: "http://localhost/api/graphql",
 }),
});

export default function App({ Component, pageProps }: AppProps) {
 return (
  <SessionProvider>
   <ApolloProvider client={client}>
    <Component {...pageProps} />
   </ApolloProvider>
  </SessionProvider>
 );
}
