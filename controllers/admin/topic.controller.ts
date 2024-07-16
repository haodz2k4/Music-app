import { Request, Response } from "express";

import Topic from '../../models/topics.model';
import Song from '../../models/song.model';
//require helper
import { btnStatus } from './../../helpers/filter.helper';
//[GET] "/admin/topics"
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
//[PATCH]  "/admin/topics/deleted/:id" (api)
export const deleted = async (req: Request, res: Response) :Promise<void> =>{

    const id = req.params.id;

    try {
        const topic = await Topic.findByIdAndUpdate(id, {deleted: true}, {new: true});
        if(!topic){
            res.status(404).json({success: false, message: "Chủ đề không tồn tại"});
            return;
        }
        res.status(200).json({success: true, message: "Xóa sản phẩm thành công"})
    } catch (error) {
        res.status(500).json({success: false, message: "Lỗi Không xác định", error: error})
    }
} 