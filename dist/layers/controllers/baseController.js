"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    static apiResultToStatusCode(res, apiResult) {
        apiResult.isSuccess ? res.status(200) : res.status(400);
    }
}
exports.BaseController = BaseController;
