import { withIronSessionApiRoute } from "iron-session/next";
import { UserModel } from "@bot-messages/util-shared";
import { NextApiHandler } from "next";
import { sessionOptions } from "./iron-session-config";

export default function withIronSessionApi(handler: NextApiHandler) {
 return withIronSessionApiRoute(handler, sessionOptions);
}

declare module "iron-session" {
 interface IronSessionData {
  user?: UserModel;
 }
}
