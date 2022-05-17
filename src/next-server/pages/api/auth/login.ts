import withIronSessionApi from "@lib/with-iron-session-api";
import { config } from "@lib/config-database";
import {
 initializeModel,
 initUser,
 User,
} from "@bot-messages/util-shared-node";
import { NextApiRequest, NextApiResponse } from "next";
import { UserSession } from "@interfaces/types";

initializeModel(initUser, config);

export default withIronSessionApi(
 async (
  req: NextApiRequest,
  res: NextApiResponse<{ error: unknown } | { user: UserSession }>
 ) => {
  const { username, password } = await req.body;
  try {
   const userFinded = await User.findOne({
    where: {
     username,
    },
   });

   if (userFinded) {
    if (await userFinded.validatePassword(password)) {
     const userSession = {
      token: userFinded.token,
      username: userFinded.username,
     };
     req.session.user = userSession;
     await req.session.save();
     res.json({ user: userSession });
     return;
    }
    throw new Error("Invalid password");
   }

   throw new Error(`Can't find user with username: ${username}`);
  } catch (e) {
   res.status(500).json({ error: (e as Error).toString() });
  }
 }
);
