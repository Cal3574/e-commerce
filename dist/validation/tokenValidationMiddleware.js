"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTokenMiddleware = void 0;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const errorClasses_1 = require("../errors/errorClasses");
function validateTokenMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
                if (err) {
                    throw new errorClasses_1.AuthenticationError("User is not authenticated", 401);
                }
                //@ts-ignore
                req.user = { id: user.userId, email: user.email };
            });
            next();
        }
        else {
            throw new errorClasses_1.AuthenticationError("User is not authenticated", 401);
        }
    }
    catch (e) {
        next(e);
    }
}
exports.validateTokenMiddleware = validateTokenMiddleware;
