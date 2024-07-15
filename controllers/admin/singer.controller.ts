import { Request, Response } from "express";
import Singer from '../../models/singer.model';
import Song from '../../models/song.model';
import Follow from '../../models/follow.model';


import { btnStatus } from "../../helpers/filter.helper";
//[GET]  "/admin/singers"
export const index = async (req: Request, res: Response) :Promise<void> =>{

    const listBtn = btnStatus(req);
    const singers = await Singer.find({ 
        deleted: false,
        status: "active"
    })
    for(const item of singers){
        item.songCount = await Song.countDocuments({singerId: item.id});
        item.followCount = await Follow.countDocuments({singerId: item.id})
    }
    res.render("admin/pages/singer/index.pug",{
        activePages: 'singers',
        singers,
        listBtn
    })
}