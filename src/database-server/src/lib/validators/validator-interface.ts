export type ValidationError = string[];

export interface ValidatorInterface {
 valid<T>(values: T): Promise<boolean>;
 getError(): ValidationError | null | undefined;
 hasError(): boolean;
}
