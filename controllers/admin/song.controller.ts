import { Request, Response } from "express";

//require model here
import Song from '../../models/song.model';
import Topic from '../../models/topics.model';
import Singer from '../../models/singer.model';
//[GET] "/admin/song"
export const index = async (req: Request, res: Response) :Promise<void> =>{

    interface Find {
        deleted: boolean,
        status: string,
        title?: RegExp
    }
    const Find: Find = {
        deleted: false,
        status: "active"
    }
    const keyword = req.query.keyword;
    if(typeof keyword === 'string'){
        const regrex: RegExp = new RegExp(keyword);
        Find.title = regrex
    }
    const songs = await Song.find(Find)
    res.render("admin/pages/song/index.pug",{
        activePages: 'songs',
        pageTitle: 'Quản lý bài hát',
        songs: songs
    })
}
//[GET] "/admin/song/add"
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
//[POST] "/admin/song/add
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