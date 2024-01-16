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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userService_1 = require("../../services/user/userService");
const addUserSchema_1 = require("../../schemas/zodSchemas/addUserSchema");
const baseController_1 = require("../baseController");
const router = express_1.default.Router();
router.get("/:email", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const email = req.params.email;
        const user = yield (0, userService_1.getUserByEmailService)(email);
        res.status(200).json(user);
    }
    catch (e) {
        next(e);
    }
}));
router.post("/new-user", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUserData = req.body;
        const validatedData = addUserSchema_1.addUserSchema.parse(newUserData);
        const newUser = yield (0, userService_1.addUserService)(validatedData);
        baseController_1.BaseController.apiResultToStatusCode(res, newUser);
        res.json(newUser);
    }
    catch (e) {
        next(e);
    }
}));
module.exports = router;
