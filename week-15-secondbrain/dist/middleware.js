"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtPass = process.env.JWT_SECRETKEY;
const userMiddleware = (req, res, next) => {
    const token = req.headers["token"];
    const decoded = jsonwebtoken_1.default.verify(token, jwtPass);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "You are not signed in"
        });
    }
};
exports.userMiddleware = userMiddleware;
