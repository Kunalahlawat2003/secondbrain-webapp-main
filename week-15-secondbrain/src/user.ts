import express from "express";
import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import {z} from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {User} from './db';
dotenv.config();

const jwtPass: any = process.env.JWT_SECRETKEY;

const userRouter: Router = express.Router();

userRouter.use(express.json());

userRouter.post("/signup", async (req, res) => {
    const requireBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(8).max(20).regex(/[A-Z]/).regex(/[!@#$%^&*(),.?":{}|<>]/),
        name: z.string().min(3).max(100)
    })

    const parsedata = requireBody.safeParse(req.body);
    if(!parsedata.success) {
        res.status(411).json({
            message: "incorrect format",
            error: parsedata.error
        })
        return
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;


    try{
        const hashedpassword = await bcrypt.hash(password, 5);

        await User.create({
            email: email,
            password: hashedpassword,
            name: name
        });
    } catch(e) {
        res.status(403).json({
            message: "User already exists"
        })
        return;
    } 

    res.status(200).json({
        message:"You are signed up"
    })
    
})

//@ts-ignore
userRouter.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email:email
    });

    if(!user) {
        return res.status(403).json({
            message: "User does not exist"
        })
    }

    //@ts-ignore
    const passwordmatch = await bcrypt.compare(password, user.password);

    if(passwordmatch) {
        const token = jwt.sign({
            id: user._id.toString()
        }, jwtPass)

        return res.status(200).json({
            token,
            user: {
                email: user.email,
                name: user.name
            }
        })
    } else {
        return res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})

export {userRouter};