import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export default function data(request: NextApiRequest, response: NextApiResponse){
 httpProxyMiddleware(request, response, {
  target: "http://localhost:5000",
  pathRewrite: [{
   patternStr: "^/api/data",
   replaceStr: "/api"
  }]
 });
}
