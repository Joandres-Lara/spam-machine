import { MIGRATIONS_PATH } from "./paths-resolved";
import fs from "fs/promises";
import path from "path";
import { Command } from "commander";

interface OptionsParsed {
 name: string;
}

const program = new Command();
const STUB_MIGRATION = path.resolve("./cli/stubs/migration.stub.ts");


program.requiredOption("--name model-name", "Create migration with name");

export default async function migration(args: string[]) {
 program.parse(args);
 const { name } = program.opts<OptionsParsed>();

 return await fs.copyFile(
  STUB_MIGRATION,
  `${MIGRATIONS_PATH}/${+new Date()}_${name}.ts`
 );
}
