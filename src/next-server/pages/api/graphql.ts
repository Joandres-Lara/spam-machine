import httpProxyMiddleware from "next-http-proxy-middleware";
import type { NextApiRequest, NextApiResponse } from "next";

export default function graphqlNextMiddleware(
 req: NextApiRequest,
 res: NextApiResponse
) {
 httpProxyMiddleware(req, res, {
  target: process.env.GRAPH_QL_PROXY,
  pathRewrite: [
   {
    patternStr: "^/api/graphql",
    replaceStr: "/graphql",
   },
  ],
 });
}
