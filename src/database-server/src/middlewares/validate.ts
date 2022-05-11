import { Request, Response, NextFunction } from "express";
import { ValidatorInterface } from "lib/validators/validator-interface";

export default function createValidateMiddleware() {
 return function validate(
  ...[request, , next]: [Request, Response, NextFunction]
 ) {
  request.validate = async function validate(values, validator) {
   if (await validator.valid(values)) {
    return values;
   } else {
    return {};
   }
  };

  next();
 };
}

declare global {
 namespace Express {
  interface Request {
   validate<T = Record<string, never>>(
    values: T,
    validator: ValidatorInterface
   ): Promise<T | Partial<T>>;
  }
 }
}
