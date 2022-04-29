import registerUser from "@lib/handlers/register-user";
import getUserSession from "@lib/handlers/get-user-session";
import { NextApiRequest } from "next";

function isRegisterAction(req: NextApiRequest) {
 return req.url?.indexOf("register") !== -1;
}

function isUserSessionAction(req: NextApiRequest) {
 return req.url?.indexOf("session") !== -1;
}

export default async function auth(req: NextApiRequest, res: NextApiResponse<any>) {
 if (isRegisterAction(req)) {
  await registerUser(req, res);
 } else if (isUserSessionAction(req)) {
  await getUserSession(req, res);
 }
}
