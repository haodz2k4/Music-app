import { Request, Response } from "express";
import Singer from '../../models/singer.model';
import Song from '../../models/song.model';
import Follow from '../../models/follow.model';


import { btnStatus } from "../../helpers/filter.helper"; 
import system from "../../config/system";
const {prefixAdmin} = system;
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
//[GET] "/admin/singers/edit/:id" 
export const edit = async (req: Request, res: Response) :Promise<void> => {
    const id = req.params.id; 
    try {
        
        const singer = await Singer.findById(id);

        if(!singer){
            res.render("clients/pages/errors/404.pug");
            return;
        } 

        res.render("admin/pages/singer/edit.pug",{
            activePages: 'singers',
            singer
        })
        
    } catch (error) {
        console.error(error);
        req.flash('error_msg','Lỗi không xác định');
    }
}
//[PATCH] "/admin/singers/edit/:id"
export const editPatch = async (req: Request, res: Response) :Promise<void> => {
    
    try {
        const id = req.params.id;
        const body = req.body;
        const singer = await Singer.updateOne({_id: id}, body);
        if(singer.modifiedCount === 1){
            req.flash('success_msg','Cập nhật ca sĩ thành công');
            res.redirect(`/${prefixAdmin}/singers`);
        }else{
            req.flash('error_msg','Cập nhật thất bại: Id ca sĩ không khớp');
            res.redirect("back");
        }
        
    } catch (error) {
        console.error(error);
        req.flash('error_msg','Lỗi không xác định');
    }
}