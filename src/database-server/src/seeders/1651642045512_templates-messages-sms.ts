import type { QueryInterface } from "sequelize";

export default {
 async up(query: QueryInterface) {
  return await query.bulkInsert("messages", [
   {
    content: JSON.stringify({
     text:
      "Hola [:contact.name] buenos días, espero que te encuentres muy bien, y sobre todo que tengas un gran día.",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
   {
    content: JSON.stringify({
     text: "Buenas tardes, hoy te tengo que recordar que debes ir a comer.",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
   {
    content: JSON.stringify({
     text:
      "Feliz cumpleaños [:contact.name], de verdad espero que te lo pases perfectamente bien de parte de [:user.username].",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
   {
    content: JSON.stringify({
     text: "Creo que tenías una reunión a las [:time]",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
   {
    content: JSON.stringify({
     text:
      "Hola, buenas noches [:contact.name], espero que duermas bien, y tengas dulces sueños, hasta mañana.",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
   {
    content: JSON.stringify({
     text:
      "Hola sólo te quería recordar que eres importante para [:user.username], ya puedes volver a tu trabajo <3",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
  ]);
 },
 async down(query: QueryInterface) {
  return await query.bulkDelete("messages", null, {});
 },
};
