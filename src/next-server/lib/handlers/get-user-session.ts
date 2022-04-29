import { NextApiRequest, NextApiResponse } from "next/types";
import withIronSessionApi from "../with-iron-session-api";

interface ResponseData {
 user: any;
}

export default withIronSessionApi(async function getUserSession(
 req: NextApiRequest,
 res: NextApiResponse<ResponseData>
) {
 if (req.session.user) {
  res.json({
   user: req.session.user,
  });
 } else {
  res.json({ user: null });
 }
});
