import type { QueryInterface } from "sequelize/types";

export default {
 up(query: QueryInterface): Promise<void> {
  return query.sequelize.transaction(async (transaction) => {
  });
 },
 down(query: QueryInterface) {
  return query.sequelize.transaction(async (transaction) => {
  });
 },
};
