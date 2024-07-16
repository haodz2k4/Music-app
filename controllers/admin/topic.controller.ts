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
        res.status(200).json({success: true, message: "Xóa sản phẩm thành công",topic})
    } catch (error) {
        res.status(500).json({success: false, message: "Lỗi Không xác định", error: error})
    }
} 
//[PATCH] "/admin/topics/change-status/:status/:id"
export const changeStatus = async (req: Request, res: Response) :Promise<void>  =>{
    const id = req.params.id;
    const status = req.params.status;
    if(!["active","inactive"].includes(status)){
        res.status(400).json({success: false, message: "Trạng thái không hợp lệ"});
        return;
    }
    try {
        const topic = await Topic.findByIdAndUpdate(id, {status: status}, {new: true});

        if(!topic){
            res.status(404).json({success: false, message: "Chủ đề không tồn tại"});
            return;
        }

        res.status(200).json({success: true, message: "Thay đổi trạng thái thành công", status: status})

    } catch (error) {
        res.status(500).json({success: false, message: "Lỗi Không xác định", error: error})
    }
}