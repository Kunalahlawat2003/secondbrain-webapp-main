import { userMiddleware } from "./middleware";
import express from "express";
import { Router } from "express";
import { Content, Tag } from "./db";

const contentRouter: Router = express.Router();

contentRouter.use(express.json());

contentRouter.post("/create" , userMiddleware, async (req, res) => {
    const content = req.body.content;
    const type = req.body.type;
    const title = req.body.title;
    const tag = req.body.tag;

    try{

      await Content.create ({
          content: content,
          type: type,
          title: title,
          tag: tag,
          //@ts-ignore
          userId: req.userId,
          date: new Date()
      })
  
      res.status(200).json({
          message: "Content Added"
      })
    } catch(error) {
        res.status(500).json({
            message: "Error while creating content",
            error
        })
    }
})

contentRouter.get("/fetch", userMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId
    try{
      const content = await Content.find({
          userId: userId
      }).populate("userId", "name")
      res.status(200).json({
        content: content
      })
    } catch(error){
        res.status(500).json({
            message:"Error while fetching content",
            error
        })
    }
})

contentRouter.delete("/delete/:contentId", userMiddleware, async (req, res) => {
    const contentId = req.params.contentId;
    //@ts-ignore
    const userId = req.userId;
    try{
        const result = await Content.findOneAndDelete({
            _id: contentId,
            userId: userId
        })
        if(!result) {
          res.status(404).json({
              message: "Content not found"
          })
          return;
        }
        res.status(200).json({
            message: "Content Deleted"
        })
    } catch(error) {
        res.status(500).json({
            message: "Error while deleteing content",
            error
        })
    }
})

export {contentRouter}