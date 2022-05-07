import { UserModel } from "@bot-messages/util-shared";
import { NextFunction, request, Request, Response } from "express";
import { User } from "@models";

function getUserByToken(token: string) {
 return User.findOne({
  where: {
   token,
  },
 });
}

export default function authorization() {
 return function middlewareAuthorization(
  request: Request,
  response: Response,
  next: NextFunction
 ) {
  request.saveValue = function saveValue<T>(key: string, value: T) {
   request[key] = value;
  };

  request.can = async function can(authorize, callback) {
   let token;

   if (request.method === "GET") {
    ({ token } = request.query as { token: string });
   } else {
    ({ token } = request.body as { token: string });
   }

   const user = (request.user = await getUserByToken(token));

   if (user === undefined || user === null) {
    response.status(500).send("Invalid token user");
    return;
   } else if (!(await authorize(user))) {
    response.status(403).send("Unathorizated by this action");
    return;
   }

   callback();
  };

  next();
 };
}

declare global {
 namespace Express {
  interface AuthorizeFunction {
   (user: UserModel): Promise<boolean>;
  }

  interface Request {
   can(when: AuthorizeFunction, fn: () => Promise<void>): Promise<void>;
   saveValue<T>(key: string, value: T): void;
   user: UserModel | null;
   [k: string]: any;
  }
 }
}
