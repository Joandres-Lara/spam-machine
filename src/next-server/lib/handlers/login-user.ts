import withIronSessionApi from "@lib/with-iron-session-api";
import { config } from "@lib/config-database";
import { initializeModel, user } from "@bot-messages/util-shared/lib/node";
import { NextApiRequest, NextApiResponse } from "next";

const User = initializeModel(user, config);

export default withIronSessionApi(
 async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { username, password } = await req.body;
  try {
   const userFinded = await User.findOne({
    username,
   });

   if (userFinded) {
    if (userFinded.validatePassword(password)) {
     req.session.user = userFinded;
     await req.session.save();
     res.json({ user: userFinded });
     return;
    }
    throw new Error("Invalid password");
   }

   throw new Error(`Can't find user with username: ${username}`);
  } catch (e) {
   res.status(500).json({ e });
  }
 }
);
