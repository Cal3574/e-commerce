"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmailService = exports.addUserService = void 0;
const ApiReturn_1 = require("../../../return/ApiReturn");
const userRepository_1 = require("../../data-access/user/userRepository");
function addUserService(userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, userRepository_1.addUser)(userData);
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(response);
    });
}
exports.addUserService = addUserService;
function getUserByEmailService(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield (0, userRepository_1.getUserByEmail)(email);
        if (!response) {
            return ApiReturn_1.ApiResultWithData.FailedResult(["User not found"]);
        }
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(response);
    });
}
exports.getUserByEmailService = getUserByEmailService;
