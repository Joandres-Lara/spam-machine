import { Request, Response, NextFunction } from "express";

export default function createFieldsMiddleware() {
 return function fields(
  ...[request, , next]: [Request, Response, NextFunction]
 ) {
  request.fields = async function fields() {
   if (request.method === "GET") {
    return request.query;
   } else {
    return request.body;
   }
  };
  next();
 };
}

declare global {
 namespace Express {
  interface Request {
   fields<
    T = Record<string, never>
   >(): Promise<T>;
  }
 }
}
