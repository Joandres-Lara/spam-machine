import { NextApiRequest, NextApiResponse } from "next/types";
import withIronSessionApi from "@lib/with-iron-session-api";
import { UserSession } from "@interfaces/types";

interface ResponseData {
 user: null | UserSession;
}

export default withIronSessionApi(async function getUserSession(
 request: NextApiRequest,
 response: NextApiResponse<ResponseData>
) {
 if (request.session.user) {
  response.json({
   user: request.session.user,
  });
 } else {
  response.json({ user: null });
 }
});
