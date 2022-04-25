import type { OAuthConfig } from "next-auth/providers";

interface Profiler {
 id: string;
 username: string;
}

export default function GrapQLDatabaseProvider(): OAuthConfig<Profiler> {
 return {
  id: "grapql-database-provider",
  type: "oauth",
  token: `${process.env.GRAPH_QL_URL}/access_token`,
  name: "grapql-database-provider",
  async profile(P: Profiler) {
   return {
    id: P.id,
    name: P.username,
   };
  },
 };
}
