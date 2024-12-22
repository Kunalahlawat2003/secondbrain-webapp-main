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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
dotenv_1.default.config();
const jwtPass = process.env.JWT_SECRETKEY;
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.use(express_1.default.json());
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requireBody = zod_1.z.object({
        email: zod_1.z.string().min(3).max(100).email(),
        password: zod_1.z.string().min(8).max(20).regex(/[A-Z]/).regex(/[!@#$%^&*(),.?":{}|<>]/),
        name: zod_1.z.string().min(3).max(100)
    });
    const parsedata = requireBody.safeParse(req.body);
    if (!parsedata.success) {
        res.status(411).json({
            message: "incorrect format",
            error: parsedata.error
        });
        return;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    try {
        const hashedpassword = yield bcrypt_1.default.hash(password, 5);
        yield db_1.User.create({
            email: email,
            password: hashedpassword,
            name: name
        });
    }
    catch (e) {
        res.status(403).json({
            message: "User already exists"
        });
        return;
    }
    res.status(200).json({
        message: "You are signed up"
    });
}));
//@ts-ignore
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    const user = yield db_1.User.findOne({
        email: email
    });
    if (!user) {
        return res.status(403).json({
            message: "User does not exist"
        });
    }
    //@ts-ignore
    const passwordmatch = yield bcrypt_1.default.compare(password, user.password);
    if (passwordmatch) {
        const token = jsonwebtoken_1.default.sign({
            id: user._id.toString()
        }, jwtPass);
        return res.status(200).json({
            token,
            user: {
                email: user.email,
                name: user.name
            }
        });
    }
    else {
        return res.status(403).json({
            message: "Incorrect Credentials"
        });
    }
}));
