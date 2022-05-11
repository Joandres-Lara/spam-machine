import type { QueryInterface, WhereOptions } from "sequelize";

export default {
 async up(query: QueryInterface) {
  await query.bulkInsert("tags", [
   {
    label: "Amorosos",
    color: "#876876",
    created_at: new Date(),
    updated_at: new Date(),
   },
   {
    label: "Cordiales",
    color: "#886642",
    created_at: new Date(),
    updated_at: new Date(),
   },
   {
    label: "Formales",
    color: "#996611",
    created_at: new Date(),
    updated_at: new Date(),
   },
  ]);
 },
 async down(query: QueryInterface) {
  await query.bulkDelete("tags", null as unknown as WhereOptions, {});
 },
};
