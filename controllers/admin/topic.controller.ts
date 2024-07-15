import { Request, Response } from "express";

import Topic from '../../models/topics.model';
import Song from '../../models/song.model';
//require helper
import { btnStatus } from './../../helpers/filter.helper';
export const index = async (req: Request, res: Response) :Promise<void>  =>{
    const listBtn = btnStatus(req);
    const topics = await Topic.find({
        deleted: false
    })
    for(const item of topics){
        (item as any).countSong = await Song.countDocuments({topicId: item.id})
    }
    res.render("admin/pages/topic/index.pug",{
        topics,
        activePages: 'topics',
        listBtn
    })
}