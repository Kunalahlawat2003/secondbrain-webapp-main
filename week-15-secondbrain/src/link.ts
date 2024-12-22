import express from "express";
import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import {Content, Link, User} from './db';
import { userMiddleware } from "./middleware";
import { random } from "./utils";
dotenv.config();

const LinkRouter: Router = express.Router();

LinkRouter.use(express.json());

LinkRouter.post("/brain/share", userMiddleware, async (req: Request, res: Response) => {
    const share = req.body.share;
    const hash = random(10);

    try{
      if(share) {
          const existingLink = await Link.findOne({
            //@ts-ignore
              userId: req.userId
          });

          if(existingLink) {
            res.status(200).json({
                message: "/share/" + existingLink.hash
            })
          }

          await Link.create({
            //@ts-ignore
              userId: req.userId,
              hash: hash
          })

          res.status(200).json({
            message: "/share/" + hash
          })
      } else {
          await Link.deleteOne({
            //@ts-ignore
              userId: req.userId
          });

          res.status(411).json({
            message: "Deleted Link"
          })
      }
    } catch (error) {
        error
    }
})

LinkRouter.get("/brain/:shareId", async (req: Request, res: Response)=> {
    const hash = req.params.shareId;

    const url = await Link.findOne({
        hash: hash
    });

    if(!url) {
        res.status(411).json({
            message: "Sorry incorrect input"
        })
        return;
    }

    const content = await Content.find({
        userId: url.userId
    })

    const user = await User.findOne({
        _id: url.userId
    })

    if(!user) {
        res.status(411).json({
            message: "User not found"
        })
        return;
    }

    res.status(200).json({
        name: user.name,
        content: content
    })
})

export {LinkRouter}