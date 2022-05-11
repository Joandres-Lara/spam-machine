import { ValidatorInterface, ValidationError } from "./validator-interface";
import { ObjectSchema } from "yup";
import { ObjectShape } from "yup/lib/object";
import { ValidationError as ValidationErrorYup } from "yup";

export default class YupValidator<T extends ObjectShape>
 implements ValidatorInterface
{
 declare schema: ObjectSchema<T>;
 declare error?: ValidationError | null;

 constructor(schema: ObjectSchema<T>) {
  this.schema = schema;
 }

 async valid<T>(values: T): Promise<boolean> {
  this.error = null;
  try {
   await this.schema.validate(values);
   return true;
  } catch (e: any) {
   this.error = (e as ValidationErrorYup).errors;
   return false;
  }
 }

 getError(): ValidationError | null | undefined {
  return this.error;
 }

 hasError(): boolean {
  return this.error !== null && this.error !== undefined;
 }
}
