import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";
import { sessionOptions } from "./iron-session-config";

export default function withIronSessionApi(handler: NextApiHandler<any>) {
 return withIronSessionApiRoute(handler, sessionOptions);
}
