import { NextApiRequest, NextApiResponse } from "next";
import { config } from "@lib/config-database";
import { UserModel } from "@bot-messages/util-shared";
import {
 initializeModel,
 initUser,
 User,
} from "@bot-messages/util-shared-node";
import withIronSessionApi from "@lib/with-iron-session-api";

initializeModel(initUser, config);

export default withIronSessionApi(async function registerUser(
 req: NextApiRequest,
 res: NextApiResponse<{ error: unknown } | { user: UserModel }>
) {
 const { username, password } = (await req.body) as {
  username: string;
  password: string;
 };

 try {
  const userCreated = await User.create({
   username,
   password,
   avatar: "/avatars/default-avatar.png"
  });

  req.session.user = userCreated;

  await req.session.save();

  res.status(201).json({ user: userCreated });
 } catch (e) {
  console.error(e);
  res.status(500).json({ error: e });
 }
});

declare global {
 // eslint-disable-next-line @typescript-eslint/no-namespace
 namespace NodeJS {
  interface ProcessEnv {
   DATABASE_USERNAME: string;
   DATABASE_PASSWORD: string;
   DATABASE_HOST: string;
   DATABASE_PORT: string;
   DATABASE_NAME: string;
  }
 }
}
