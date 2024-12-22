"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Link = exports.Tag = exports.Content = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_2 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectToDataBase = () => __awaiter(void 0, void 0, void 0, function* () {
    const MONGOURL = process.env.MONGO_URL;
    try {
        yield mongoose_1.default.connect(MONGOURL, {});
        console.log("Connect Established");
    }
    catch (error) {
        console.error('Error connecting to database', error);
    }
});
connectToDataBase();
const UserSchema = new mongoose_2.Schema({
    email: { type: String, unique: true },
    password: String,
    name: { type: String, unique: true }
});
const User = mongoose_1.default.model('User', UserSchema);
exports.User = User;
const tagSchema = new mongoose_2.Schema({
    title: { type: String, required: true, unique: true },
    contentId: { type: mongoose_1.Types.ObjectId },
    userId: { type: mongoose_1.Types.ObjectId, ref: User }
});
const Tag = mongoose_1.default.model('Tag', tagSchema);
exports.Tag = Tag;
const contentTypes = ['youtube', 'text', 'tweet', 'tag'];
const ContentSchema = new mongoose_2.Schema({
    content: String,
    title: String,
    type: { type: String, enum: contentTypes, required: true },
    tag: [{ type: String, ref: Tag }],
    userId: { type: mongoose_1.Types.ObjectId, ref: User },
    date: { type: Date, default: Date.now }
});
const Content = mongoose_1.default.model('Content', ContentSchema);
exports.Content = Content;
const linkSchema = new mongoose_2.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.Types.ObjectId, required: true, ref: User, unique: true }
});
const Link = mongoose_1.default.model('Link', linkSchema);
exports.Link = Link;
