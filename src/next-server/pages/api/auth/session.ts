import { NextApiRequest, NextApiResponse } from "next/types";
import { UserModel } from "@bot-messages/util-shared";
import withIronSessionApi from "@lib/with-iron-session-api";

interface ResponseData {
 user: null | UserModel;
}

export default withIronSessionApi(async function getUserSession(
 request: NextApiRequest,
 response: NextApiResponse<ResponseData>
) {
 if (request.session.user) {
  console.log("Request", request.session.user);
  response.json({
   user: request.session.user,
  });
 } else {
  response.json({ user: null });
 }
});
