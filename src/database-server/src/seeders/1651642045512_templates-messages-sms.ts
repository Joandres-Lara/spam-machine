import type { QueryInterface, WhereOptions } from "sequelize";

export default {
 async up(query: QueryInterface) {
  return await query.bulkInsert(
   "messages",
   [
    // Cordials messages
    {
     content: JSON.stringify({
      text:
       "Hola [:contact.name] buenos días, espero que te encuentres muy bien, y sobre todo que tengas un gran día.",
      format: "normal",
     }),
    },
    {
     content: JSON.stringify({
      text: "Buenas tardes, hoy te tengo que recordar que debes ir a comer.",
      format: "normal",
     }),
    },
    {
     content: JSON.stringify({
      text:
       "Feliz cumpleaños [:contact.name], de verdad espero que te lo pases perfectamente bien de parte de [:user.username].",
      format: "normal",
     }),
    },
    {
     content: JSON.stringify({
      text:
       "Hola, buenas noches [:contact.name], espero que duermas bien, y tengas dulces sueños, hasta mañana.",
      format: "normal",
     }),
    },
    {
     content: JSON.stringify({
      text:
       "Hola sólo te quería recordar que eres importante para [:user.username], ya puedes volver a tu trabajo <3",
      format: "normal",
     }),
    },
    // Lovers messages
    {
     content: JSON.stringify({
      text: "Te amo",
      format: "normal",
     }),
    },
    {
     content: JSON.stringify({
      text: "Hola mi amor buenos días",
      format: "normal",
     }),
    },
    {
     content: JSON.stringify({
      text: "Que tengas un buen día mi amor",
      format: "normal",
     }),
    },
    {
     content: JSON.stringify({
      text: "Hola mi amor no se te olvide pasar por los niños a la escuela.",
      format: "normal",
     }),
    },
    // Formals messages
    {
     content: JSON.stringify({
      text: "Hola te recuerdo que hoy tenemos junta a las [:at]",
      format: "normal",
     }),
    },
    {
     content: JSON.stringify({
      text: "Hola, recuerda que toca pagar la renta del departamento",
      format: "normal",
     }),
    },
    {
     content: JSON.stringify({
      text: "Hola, recuerda que pronto vence el recibo de la luz",
      format: "normal",
     }),
    },
   ].map(({ content }) => ({
    content,
    type: "sms",
    is_default: true,
    created_at: new Date(),
    updated_at: new Date(),
   }))
  );
 },
 async down(query: QueryInterface) {
  return await query.bulkDelete(
   "messages",
   null as unknown as WhereOptions,
   {}
  );
 },
};
