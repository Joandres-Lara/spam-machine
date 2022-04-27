import type { QueryInterface } from "sequelize";

export default {
 up(query: QueryInterface): Promise<void> {
  return query.sequelize.transaction(async (transaction) => {
   try{
    await transaction.commit();
   }catch(e){
    await transaction.rollback();
   }
  });
 },
 down(query: QueryInterface) {
  return query.sequelize.transaction(async (transaction) => {
   try{
    await transaction.commit();
   }catch(e){
    await transaction.rollback();
   }
  });
 },
};
