import { Response, NextFunction } from "express";
import { ApiResult, ApiResultWithData } from "../util/ApiReturn";
import { z } from "zod";
import { BaseController } from "../layers/controllers/baseController";
export const errorHandler = (
  e: any,
  req: any,
  res: Response,
  next: NextFunction
) => {
  // Zod errors
  if (e instanceof z.ZodError) {
    // Transform Zod error into a user-friendly response
    const validationErrors = e.issues.map((issue: any) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    //@ts-ignore
    const apiResult = ApiResult.FailedResult(validationErrors);
    BaseController.apiResultToStatusCode(res, apiResult);
    return res.json(apiResult);
  }

  if (e.code === "P2002") {
    const apiResult = ApiResult.FailedResult(["Unique constraint failed"]);
    BaseController.apiResultToStatusCode(res, apiResult);
    return res.json(apiResult);
  }

  const apiResult = ApiResult.FailedResult([
    e.message || "Internal Server Error",
  ]);

  BaseController.apiResultToStatusCode(res, apiResult);
  return res.json(apiResult);
};
