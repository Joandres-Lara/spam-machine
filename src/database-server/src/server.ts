import { default as express, Router } from "express";
import authorization from "./middlewares/authorization";
import fields from "./middlewares/fields";
import validate from "./middlewares/validate";
import * as messagesController from "./controllers/api/messages-controller";
import * as historyContactMessagesController from "./controllers/api/history-contacts-messages-controller";
import * as tagsMessagesController from "./controllers/api/tags-messages-controller";
import * as tagsController from "./controllers/api/tags-controller";
import * as contactMessagesController from "./controllers/api/contact-messages-controller";
import * as sendingMessagesController from "./controllers/api/sending-messages-controller";
import * as contactsController from "./controllers/api/contacts-controller";
import * as cronMessagesController from "./controllers/api/cron-messages-controller";
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
app.use(fields());
app.use(validate());

app.use("/api/contact", Router().post("/create", contactsController.create));

app.use(
 "/api/messages",
 Router()
  .get("/", messagesController.get)
  .post("/create", messagesController.create)
  .post("/:id", messagesController.byId)
);

app.use(
 "/api/tags",
 Router()
  .post("/create", tagsController.create)
  .post("/find", tagsController.find)
);

app.use(
 "/api/history-contacts-messages",
 Router().get("/", historyContactMessagesController.get)
);

app.use(
 "/api/contact-messages",
 Router().get("/", contactMessagesController.get)
);

app.use("/api/tags-messages", Router().get("/", tagsMessagesController.get));

app.use(
 "/api/sending-messages",
 Router().get("/", sendingMessagesController.get)
);

app.use(
 "/api/cron-messages",
 Router().post("/create", cronMessagesController.create)
);

app.listen(5000, () => console.log("Server start"));
