import registerUser from "@lib/handlers/register-user";
import getUserSession from "@lib/handlers/get-user-session";
import logout from "@lib/handlers/logout";
import { NextApiRequest } from "next";
import loginUser from "@lib/handlers/login-user";

function isRegisterAction(req: NextApiRequest) {
 return req.url?.indexOf("register") !== -1;
}

function isUserSessionAction(req: NextApiRequest) {
 return req.url?.indexOf("session") !== -1;
}

function isLoginAction(req: NextApiRequest) {
 return req.url?.indexOf("login") !== -1;
}

function isLogoutAction(req: NextApiRequest) {
 return req.url?.indexOf("logout") !== -1;
}

export default async function auth(
 req: NextApiRequest,
 res: NextApiResponse<any>
) {
 if (isRegisterAction(req)) {
  await registerUser(req, res);
 } else if (isUserSessionAction(req)) {
  await getUserSession(req, res);
 } else if (isLoginAction(req)) {
  await loginUser(req, res);
 } else if (isLogoutAction(req)) {
  await logout(req, res);
 }
 return res.status(404);
}
