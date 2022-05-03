import { NextApiRequest, NextApiResponse } from "next";
import { config } from "@lib/config-database";
import { randomString } from "@bot-messages/util-shared";
import {
 initializeModel,
 initUser,
 User,
} from "@bot-messages/util-shared-node";
import withIronSessionApi from "@lib/with-iron-session-api";
import { UserSession } from "@interfaces/types";

initializeModel(initUser, config);

export default withIronSessionApi(async function registerUser(
 req: NextApiRequest,
 res: NextApiResponse<{ error: unknown } | { user: UserSession }>
) {
 const { username, password } = (await req.body) as {
  username: string;
  password: string;
 };

 try {
  const userCreated = await User.create({
   username,
   password,
   token: randomString(64),
   avatar: "/avatars/default-avatar.png"
  });

  const userSession = {
   token: userCreated.token,
   username: userCreated.username,
   id: userCreated.id
  };

  req.session.user = userSession;

  await req.session.save();

  res.status(201).json({ user: userSession });
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
