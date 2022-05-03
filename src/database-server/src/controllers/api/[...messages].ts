import { Request, Response } from "express";
import { Message } from "@models";

export async function get(request: Request, response: Response) {
 try {
  response.json(await Message.findAll());
 } catch (e) {
  response.status(500).json({ error: e });
 }
}
