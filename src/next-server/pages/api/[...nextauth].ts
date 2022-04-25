import NextAuth from "next-auth";
import GrapQLDatabaseProvider from "@lib/graphql-database-provider";

export default NextAuth({
 providers: [GrapQLDatabaseProvider()],
});
