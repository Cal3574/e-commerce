"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { requiresAuth } = require("express-openid-connect");
const router = express_1.default.Router();
// req.isAuthenticated is provided from the auth router
router.get("/profile", requiresAuth(), (req, res) => {
    console.log(req.secret);
    console.log(req);
    console.log(req.oidc.user);
    res.send(JSON.stringify(req.oidc.user));
});
module.exports = router;
