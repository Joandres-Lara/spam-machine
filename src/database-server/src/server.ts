import { default as express, Router } from "express";
import authorization from "./middlewares/authorization";
import * as contactsController from "./controllers/api/contacts-controller";
import * as historyMessagesController from "./controllers/api/history-messages-controller";
import * as messagesController from "./controllers/api/messages-controller";
import * as tagsMessagesController from "./controllers/api/tags-messages-controller";
import { default as cors } from "cors";
import { json, urlencoded } from "body-parser";

const app = express();

app.use(
 cors({
  origin: "http://localhost:3000",
 })
);

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(authorization());

app.use(
 "/api/contact",
 Router()
  .get("/", contactsController.get)
  .post("/create", contactsController.create)
);

app.use(
 "/api/history-messages",
 Router().get("/", historyMessagesController.get)
);

app.use("/api/tags-messages", Router().get("/", tagsMessagesController.get));

app.use("/api/messages", Router().get("/", messagesController.get));

app.listen(5000, () => console.log("Server start"));
