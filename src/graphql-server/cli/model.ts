import { MIGRATIONS_PATH, MODELS_PATH } from "./paths-resolved";
import path from "path";
import fs from "fs/promises";
import { Command } from "commander";
import { camelCase, kebabCase, pluralize } from "@bot-messages/util-shared";

interface ParsedOptions {
 name: string;
 attributes: Record<string, string>;
}

const program = new Command();

//TODO: Create parsed attributes option.
program.requiredOption("--name <modelName>");

const STUB_MIGRATION = path.resolve("./cli/stubs/model-migration.stub.ts");
const STUB_MODEL_DEFINITION = path.resolve("./cli/stubs/model.stub.ts");

export default async function model(args: string[]) {
 program.parse(args);

 const { name: modelName } = program.opts<ParsedOptions>();
 const camelCaseModelName = camelCase(modelName, true);
 const kebabCaseModelName = kebabCase(modelName);

 const contentStubMigration = (await fs.readFile(STUB_MIGRATION)).toString();
 const contentStubModelDefinition = (
  await fs.readFile(STUB_MODEL_DEFINITION)
 ).toString();

 await fs.writeFile(
  `${MIGRATIONS_PATH}/${+new Date()}_create-table-${pluralize(
   kebabCaseModelName
  )}.ts`,
  contentStubMigration.replace(
   /\[model\-name\]/g,
   pluralize(kebabCaseModelName)
  )
 );

 await fs.writeFile(
  `${MODELS_PATH}/${kebabCaseModelName}.ts`,
  contentStubModelDefinition.replace(/\[model\-name\]/g, camelCaseModelName)
 );
}
