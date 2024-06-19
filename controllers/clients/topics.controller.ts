import { Request, Response } from "express";
import Topic from '../../models/topics.model';
//[GET] "/topics"
export const index = async (req: Request, res: Response): Promise<void> =>{
    const topics = await Topic.find({deleted: false})
    res.render("clients/pages/topics/index.pug",{
        pageTitle: "Chủ đề bài hát",
        topics: topics
    });
}