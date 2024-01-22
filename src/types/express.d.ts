// express.d.ts
import * as express from "express";

declare module "express" {
  export interface Request {
    user?: {
      id: string;
    };
    // any other properties you might want to add
  }
}
