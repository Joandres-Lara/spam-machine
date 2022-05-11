export type Jsonable = Record<string, unknown> | unknown[];

export default class JsonError<
 T extends Jsonable = Record<string, never>
> extends Error {
 declare json: Jsonable;

 constructor(json?: T | null, message?: string, options?: ErrorOptions) {
  message = message || "[JsonError] " + JSON.stringify(json);
  super(message, options);
  if (json !== undefined && json !== null) this.json = json;
  this.name = "JsonError";
 }

 toJson() {
  return this.json;
 }
}
