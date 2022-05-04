import type { QueryInterface, WhereOptions } from "sequelize";

export default {
 async up(query: QueryInterface) {
  return await query.bulkInsert("messages", [
   // Cordials messages
   {
    id: 1,
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
    id: 2,
    content: JSON.stringify({
     text: "Buenas tardes, hoy te tengo que recordar que debes ir a comer.",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
   {
    id: 3,
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
    id: 4,
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
    id: 5,
    content: JSON.stringify({
     text:
      "Hola sólo te quería recordar que eres importante para [:user.username], ya puedes volver a tu trabajo <3",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
   // Lovers messages
   {
    id: 6,
    content: JSON.stringify({
     text: "Te amo",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
   {
    id: 7,
    content: JSON.stringify({
     text: "Hola mi amor buenos días",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
   {
    id: 8,
    content: JSON.stringify({
     text: "Que tengas un buen día mi amor",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
   {
    id: 9,
    content: JSON.stringify({
     text: "Hola mi amor no se te olvide pasar por los niños a la escuela.",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
   // Formals messages
   {
    id: 10,
    content: JSON.stringify({
     text: "Hola te recuerdo que hoy tenemos junta a las [:at]",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
   {
    id: 11,
    content: JSON.stringify({
     text: "Hola, recuerda que toca pagar la renta del departamento",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
   {
    id: 12,
    content: JSON.stringify({
     text: "Hola, recuerda que pronto vence el recibo de la luz",
     format: "normal",
    }),
    type: "sms",
    created_at: new Date(),
    updated_at: new Date(),
   },
  ]);
 },
 async down(query: QueryInterface) {
  return await query.bulkDelete(
   "messages",
   null as unknown as WhereOptions,
   {}
  );
 },
};
