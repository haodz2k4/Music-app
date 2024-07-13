import { Request, Response } from "express";
//require model here
import Song from '../../models/song.model';
import Topic from '../../models/topics.model';
import Singer from '../../models/singer.model';
import Like from '../../models/like.model';
//require helper here
import { btnStatus } from "../../helpers/status.helper";
import { listSort } from "../../helpers/sort.helper";
//[GET] "/admin/songs"
export const index = async (req: Request, res: Response): Promise<void> => {
    interface Find {
        deleted: boolean;
        status?: string;
        title?: RegExp;
    }
    //search
    const Find: Find = {
        deleted: false,
    };
    const keyword = req.query.keyword;
    if (typeof keyword === 'string') {
        const regrex: RegExp = new RegExp(keyword);
        Find.title = regrex;
    }
    //end search

    // filter 
    const listBtn = btnStatus(req);
    const status = req.query.status;
    const validStatus = ["active", "inactive"];
    if (typeof status === 'string' && validStatus.includes(status)) {
        Find.status = status;
    } else {
        req.flash('error_msg', 'trạng thái không hợp lệ');
    }
    //end filter 

    // sort 
    const validKeysort: string[] = ['title', 'listen', 'date']
    const sort = listSort(req, validKeysort);
    // end sort 

    const songs = await Song.find(Find).sort(sort);
    //add filed likes 
    for(const item of songs){
        item.likes = await Like.countDocuments({
            songId: item.id
        })
        
    }
    
    res.render("admin/pages/song/index.pug", {
        activePages: 'songs',
        keyword,
        pageTitle: 'Quản lý bài hát',
        songs,
        listBtn,
    });
};

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
        case "deleted":
            await Song.updateMany({
                _id: {$in: ids}
            },{
                deleted: true
            })
            req.flash('success_msg','Xóa các sản phẩm thành công')
            break;
        default:
            req.flash('error_msg','Trạng thái không hợp lệ')

    }
    res.redirect("back");
}
//[GET] "/admin/songs/detail/:id"
export const detail = async (req: Request, res: Response) :Promise<void> =>{

    try {
        const id = req.params.id;
        const song = await Song.findById(id);
        if(!song){
            res.render("clients/pages/errors/404.pug");
            return;
        }
        const singer = await Singer.findById(song.singerId).select("fullName");
        const topic = await Topic.findById(song.topicId).select("title");
        song.likeCount = await Like.countDocuments({songId: song.id})
        song.singerName = singer?.fullName;
        song.topicTitle = topic?.title;
        
        res.render("admin/pages/song/detail.pug",{
            activePages: 'songs',
            song
        });
    } catch (error) {
        console.error(error);
        res.render("clients/pages/errors/500.pug")
    }
}
//[GET] "/admin/songs/edit/:id"
export const edit = async (req: Request, res: Response) : Promise<void>  =>{
    try {
        const id = req.params.id;
        const song = await Song.findOne({
            _id: id
        })
        const singers = await Singer.find({
            deleted: false,
            status: "active"
        })
        const topics = await Topic.find({
            deleted: false,
            status: "active"
        })
        if(!song){
            res.render("clients/pages/errors/404.pug");
            return;
        }
        res.render("admin/pages/song/edit.pug",{
            song,
            singers,
            topics,
            activePages: 'songs'

        })
    } catch (error) {
        console.error(error);
        res.render("clients/pages/errors/500.pug")
    }
}
//[PATCH] "/admin/songs/edit/:id"
export const editPatch = async (req: Request, res: Response) :Promise<void>  =>{

    try {
        const id = req.params.id;
        const body = req.body;
        await Song.updateOne({
            _id: id
        }, body)
    
        res.redirect("/admin/songs");
    } catch (error) {
        console.error(error);
        res.redirect("clients/pages/errors/500.pug")
    }
}
//[PATCH] "/admin/songs/deleted/:id" (api)
export const deleted = async (req: Request, res: Response) :Promise<void> =>{
    try {
        const id = req.params.id;
        
        await Song.updateOne({
            _id: id
        },{
            deleted: true
        })
    
        res.status(200).json({success: true, message: "Xóa thành công"});
    } catch (error) {
        console.error(error);
        res.status(400).json({success: false, message: "Xóa thất bại"});
    }
    
}
//[PATCH] "/admin/songs/change-status/:status/:id"
export const changeStatus = async (req: Request, res: Response) :Promise<void>  =>{
    console.log("run here")
    const status = req.params.status;
    const id = req.params.id;
    try {
        await Song.updateOne({
            _id: id
        }, {
            status: status
        })
        res.status(200).json({success: true, message: "Cập nhật thành công", status: status})
    } catch (error) {
        res.status(400).json({success: false, message: "Cập nhật thất bại"});
    }
}
