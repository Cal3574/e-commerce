"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResultWithData = exports.ApiResult = void 0;
class ApiResult {
    constructor(isSuccess, errors) {
        this.isSuccess = isSuccess;
        this.errors = errors;
    }
    static SuccessfulResult() {
        return new ApiResult(true, []);
    }
    static FailedResult(errors) {
        return new ApiResult(false, errors);
    }
}
exports.ApiResult = ApiResult;
class ApiResultWithData {
    constructor(isSuccess, errors, data = undefined) {
        this.isSuccess = isSuccess;
        this.errors = errors;
        this.data = data;
    }
    static SuccessfulResult(data) {
        return new ApiResultWithData(true, [], data);
    }
    static FailedResult(errors) {
        return new ApiResultWithData(false, errors);
    }
}
exports.ApiResultWithData = ApiResultWithData;
