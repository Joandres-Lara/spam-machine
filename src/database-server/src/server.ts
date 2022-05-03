import { default as express, Router } from "express";
import authorization from "./middlewares/authorization";
import * as contacts from "./controllers/api/[...contacts]";
import * as historyMessages from "./controllers/api/[...history-messages]";
import * as messages from "./controllers/api/[...messages]";
import { default as cors } from "cors";
import { json } from "body-parser";

const app = express();

app.use(
 cors({
  origin: "http://localhost:3000",
 })
);
app.use(json());
app.use(authorization());

app.use(
 "/api/contact",
 Router().get("/", contacts.get).post("/create", contacts.create)
);

app.use("/api/history-messages", Router().get("/", historyMessages.get));

app.use("/api/messages", Router().get("/", messages.get));

app.listen(5000, () => console.log("Server start"));
