import { UserModel } from "@bot-messages/util-shared";
import { NextFunction, Request, Response } from "express";
import { User } from "@models";
import YupValidator from "@lib/validators/yup-validator";
import { object, string } from "yup";

function getUserByToken(token: string) {
 return User.findOne({
  where: {
   token,
  },
 });
}

const schemaYup = object({
 token: string().length(64, "Token should be length 64 characters"),
});

const validatorToken = new YupValidator(schemaYup);

export default function createAuthorizationMiddleware() {
 return function authorization(
  request: Request,
  response: Response,
  next: NextFunction
 ) {
  request.saveValue = function saveValue<T>(key: string, value: T) {
   request[key] = value;
  };

  request.can = async function can(authorize, callback) {
   try {
    const { token } = await request.validate(
     await request.fields<{ token?: string }>(),
     validatorToken
    );

    if (token === null || token === undefined) {
     response.status(403).send(validatorToken.getError() || "Token not found");
     return;
    }

    const user = (request.user = await getUserByToken(token));

    if (user === undefined || user === null) {
     response.status(403).send("User not found");
     return;
    } else if (!(await authorize(user))) {
     response.status(403).send("Unathorizated by this action");
     return;
    }
    callback();
   } catch (e) {
    response.status(500).send({ error: e });
   }
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
