import type { QueryInterface, WhereOptions } from "sequelize";

export default {
 async up(query: QueryInterface) {
  return query.bulkInsert(
   "tags_messages",
   [
    {
     message_id: 1,
     tag_id: 2,
    },
    {
     message_id: 2,
     tag_id: 2,
    },
    {
     message_id: 3,
     tag_id: 2,
    },
    {
     message_id: 5,
     tag_id: 2,
    },
    {
     message_id: 6,
     tag_id: 1,
    },
    {
     message_id: 7,
     tag_id: 1,
    },
    {
     message_id: 8,
     tag_id: 1,
    },
    {
     message_id: 9,
     tag_id: 1,
    },
    {
     message_id: 10,
     tag_id: 3,
    },
    {
     message_id: 11,
     tag_id: 3,
    },
    {
     message_id: 12,
     tag_id: 3,
    },
   ].map((_) => ({
    ..._,
    created_at: new Date(),
    updated_at: new Date(),
   }))
  );
 },
 async down(query: QueryInterface) {
  return await query.bulkDelete(
   "tags_messages",
   null as unknown as WhereOptions,
   {}
  );
 },
};
