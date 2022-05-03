import { withIronSessionApiRoute } from "iron-session/next";
import { UserSession } from "@interfaces/types";
import { NextApiHandler } from "next";
import { sessionOptions } from "./iron-session-config";

export default function withIronSessionApi(handler: NextApiHandler) {
 return withIronSessionApiRoute(handler, sessionOptions);
}


declare module "iron-session" {
 interface IronSessionData {
  user?: UserSession;
 }
}
