import { IronSessionOptions } from "iron-session";

export const sessionOptions: IronSessionOptions = {
 password: process.env.SECRET_COOKIE_PASSWORD as string,
 cookieName: "bot-message-cookie",
 cookieOptions: {
  secure: false,
 },
};
