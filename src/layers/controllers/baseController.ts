import { Response } from "express";
import { ApiResult } from "../../return/ApiReturn";

export class BaseController {
  public static apiResultToStatusCode(res: Response, apiResult: ApiResult) {
    apiResult.isSuccess ? res.status(200) : res.status(400);
  }
}
