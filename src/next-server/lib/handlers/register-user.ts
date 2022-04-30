import { NextApiRequest, NextApiResponse } from "next";
import { config } from "@lib/config-database";
import { initializeModel, user } from "@bot-messages/util-shared/lib/node";
import withIronSessionApi from "@lib/with-iron-session-api";

const User = initializeModel(user, config);

export default withIronSessionApi(async function registerUser(
 req: NextApiRequest,
 res: NextApiResponse<any>
) {
 const { username, password } = await req.body;

 try {
  const userCreated = await User.create({
   username,
   password,
   avatar: "/avatars/default-avatar.png",
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
