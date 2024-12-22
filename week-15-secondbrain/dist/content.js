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
exports.contentRouter = void 0;
const middleware_1 = require("./middleware");
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const contentRouter = express_1.default.Router();
exports.contentRouter = contentRouter;
contentRouter.use(express_1.default.json());
contentRouter.post("/create", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body.content;
    const type = req.body.type;
    const title = req.body.title;
    const tag = req.body.tag;
    try {
        yield db_1.Content.create({
            content: content,
            type: type,
            title: title,
            tag: tag,
            //@ts-ignore
            userId: req.userId,
            date: new Date()
        });
        res.status(200).json({
            message: "Content Added"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error while creating content",
            error
        });
    }
}));
contentRouter.get("/fetch", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = yield db_1.Content.find({
            userId: userId
        }).populate("userId", "name");
        res.status(200).json({
            content: content
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error while fetching content",
            error
        });
    }
}));
contentRouter.delete("/delete/:contentId", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.contentId;
    //@ts-ignore
    const userId = req.userId;
    try {
        const result = yield db_1.Content.findOneAndDelete({
            _id: contentId,
            userId: userId
        });
        if (!result) {
            res.status(404).json({
                message: "Content not found"
            });
            return;
        }
        res.status(200).json({
            message: "Content Deleted"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error while deleteing content",
            error
        });
    }
}));
