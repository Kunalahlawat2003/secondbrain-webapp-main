import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtPass: any = process.env.JWT_SECRETKEY;

interface JwtPayload {
    id: string;
    // Add other fields if needed
  }

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.headers["token"];
    const decoded = jwt.verify(token , jwtPass) as JwtPayload;

    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next()
    } else {
        res.status(403).json({
            message: "You are not signed in"
        })
    }

}
