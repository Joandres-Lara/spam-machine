import { argv } from "process";
import migration from "./migration";
import model from "./model";

(async () => {
 try{
  if(argv.includes("migration")){
   await migration(argv);
   process.exit();
  }

  if(argv.includes("model")){
   await model(argv);
   process.exit();
  }

  throw new Error("Invalid called cli");
 }catch(e){
  console.error(e);
 }
})();
