import withIronSessionApi from "@lib/with-iron-session-api";
import { config } from "@lib/config-database";
import { UserModel } from "@bot-messages/util-shared";
import { initializeModel, initUser, User } from "@bot-messages/util-shared-node";
import { NextApiRequest, NextApiResponse } from "next";

initializeModel(initUser, config);

export default withIronSessionApi(
 async (
  req: NextApiRequest,
  res: NextApiResponse<{ error: unknown } | { user: UserModel }>
 ) => {
  const { username, password } = await req.body;
  try {
   const userFinded = await User.findOne({
    where: {
     username
    }
   });

   if (userFinded) {
    if (await userFinded.validatePassword(password)) {
     req.session.user = userFinded as UserModel;
     await req.session.save();
     res.json({ user: userFinded });
     return;
    }
    throw new Error("Invalid password");
   }

   throw new Error(`Can't find user with username: ${username}`);
  } catch (e) {
   res.status(500).json({ error: e });
  }
 }
);
