import { ZodType } from "zod";

export interface ZodGenericSchema {
  [key: string]: ZodType<any, any>;
}
