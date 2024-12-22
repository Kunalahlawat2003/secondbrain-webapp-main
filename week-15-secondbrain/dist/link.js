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
exports.LinkRouter = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
dotenv_1.default.config();
const LinkRouter = express_1.default.Router();
exports.LinkRouter = LinkRouter;
LinkRouter.use(express_1.default.json());
LinkRouter.post("/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    const hash = (0, utils_1.random)(10);
    try {
        if (share) {
            const existingLink = yield db_1.Link.findOne({
                //@ts-ignore
                userId: req.userId
            });
            if (existingLink) {
                res.status(200).json({
                    message: "/share/" + existingLink.hash
                });
            }
            yield db_1.Link.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash
            });
            res.status(200).json({
                message: "/share/" + hash
            });
        }
        else {
            yield db_1.Link.deleteOne({
                //@ts-ignore
                userId: req.userId
            });
            res.status(411).json({
                message: "Deleted Link"
            });
        }
    }
    catch (error) {
        error;
    }
}));
LinkRouter.get("/brain/:shareId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareId;
    const url = yield db_1.Link.findOne({
        hash: hash
    });
    if (!url) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    const content = yield db_1.Content.find({
        userId: url.userId
    });
    const user = yield db_1.User.findOne({
        _id: url.userId
    });
    if (!user) {
        res.status(411).json({
            message: "User not found"
        });
        return;
    }
    res.status(200).json({
        name: user.name,
        content: content
    });
}));
