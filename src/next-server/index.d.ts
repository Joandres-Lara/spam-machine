declare global {
 namespace NodeJS {
  interface ProcessEnv {
   GRAPH_QL_URL?: string;
   GRAPH_QL_PROXY?: string;
  }
 }
}
