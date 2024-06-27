
import { Request, Response } from "express";

//require model here
import Song from '../../models/song.model';
import Topic from '../../models/topics.model';
import Singer from '../../models/singer.model';
//require helper here
import { btnStatus } from "../../helpers/status.helper";
//[GET] "/admin/songs"
export const index = async (req: Request, res: Response) :Promise<void> =>{

    interface Find {
        deleted: boolean,
        status?: string,
        title?: RegExp
    }
    //search
    const Find: Find = {
        deleted: false,
    }
    const keyword = req.query.keyword;
    if(typeof keyword === 'string'){
        const regrex: RegExp = new RegExp(keyword);
        Find.title = regrex
    }
    //end search 
    //filter
    const listBtn = btnStatus(req);
    const status = req.query.status;
    const validStatus = ["active","inactive"];
    if(typeof status === 'string' && validStatus.includes(status)){
        Find.status = status;
    }else{
        req.flash('error_msg','trạng thái không hợp lệ')
    }
    //end filter 
    const songs = await Song.find(Find)
    res.render("admin/pages/song/index.pug",{
        activePages: 'songs',
        keyword,
        pageTitle: 'Quản lý bài hát',
        songs,
        listBtn
    })
}
//[GET] "/admin/songs/add"
export const add = async (req: Request, res: Response) :Promise<void> =>{
    
    const topics = await Topic.find({
        deleted: false,
        status: "active"
    })
    const singers = await Singer.find({
        deleted: false,
        status: "active"
    });

    res.render("admin/pages/song/create.pug",{
        pageTitle: "Thêm bài hát",
        activePages: 'songs',
        topics: topics,
        singers: singers
    });
}
//[POST] "/admin/songs/add
export const addPost = async (req: Request, res: Response) :Promise<void>  =>{

    try {
        const song = new Song(req.body);
        await song.save();
        req.flash('success_msg','Thêm bài hát thành công')
        res.redirect("/admin/songs");
    } catch (error) {
        res.render("")
    }
}
//[PATCH] "/admin/songs/change-multi"
export const changeMulti = async (req: Request, res: Response) :Promise<void>  =>{
    const status = req.body.status;
    const ids = req.body.ids.split("-");
    switch(status) {
        case "active": 
            await Song.updateMany({
                _id: {$in: ids}
            },{
                status: status
            }) 
            req.flash('success_msg','Cập nhật trạng thái thành công') 
            break;
        case "inactive":
            await Song.updateMany({
                _id: {$in: ids}
            },{
                status: status
            })
            req.flash('success_msg','Cập nhật trạng thái thành công') 
            break;
        case "delete":
            await Song.updateMany({
                _id: {$in: ids}
            },{
                deleted: true
            })
            req.flash('success_msg','Xóa các sản phẩm thành công')
            break;

    }
    res.redirect("back");
}