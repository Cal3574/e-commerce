"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ApiReturn_1 = require("../return/ApiReturn");
const zod_1 = require("zod");
const baseController_1 = require("../layers/controllers/baseController");
const errorHandler = (e, req, res, next) => {
    // Zod errors
    if (e instanceof zod_1.z.ZodError) {
        // Transform Zod error into a user-friendly response
        const validationErrors = e.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
        }));
        //@ts-ignore
        const apiResult = ApiReturn_1.ApiResult.FailedResult(validationErrors);
        baseController_1.BaseController.apiResultToStatusCode(res, apiResult);
        return res.json(apiResult);
    }
    if (e.code === "P2002") {
        const apiResult = ApiReturn_1.ApiResult.FailedResult(["Email already exists"]);
        baseController_1.BaseController.apiResultToStatusCode(res, apiResult);
        return res.json(apiResult);
    }
    const apiResult = ApiReturn_1.ApiResult.FailedResult([
        e.message || "Internal Server Error",
    ]);
    baseController_1.BaseController.apiResultToStatusCode(res, apiResult);
    return res.json(apiResult);
};
exports.errorHandler = errorHandler;
