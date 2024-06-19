import { Request, Response } from "express";
import Song from '../../models/song.model';
import Topic from '../../models/topics.model';
import Single from '../../models/singer.model';
import Like from '../../models/like.model';
import FavoriteSong from '../../models/favorite-song.model';
import Comment from '../../models/comment.model';
import User from '../../models/user.model';
//[GET "/song/:slugTopic"
export const list = async (req: Request, res: Response): Promise<void> =>{
    const slugTopic = req.params.slugTopic;
    try {
        const topic = await Topic.findOne({
            slug: slugTopic
        }).select("title");
        const songs = await Song.find({deleted: false,status: "active",topicId: topic?.id});
        for(const item of songs){
            item.like = await Like.countDocuments({songId: item.id})
            const singleName = await Single.findOne({_id: item.singerId}).select("fullName");
            item.singleName = singleName?.fullName


        }
        
        res.render("clients/pages/songs/list.pug",{
            pageTitle: topic?.title,
            songs: songs
        })
    } catch (error) {
        console.log(error)
    }
}
//[GET] "/song/detail/:slugSong"
export const detail = async (req: Request, res: Response): Promise<void> =>{
    try {
        const slugSong = req.params.slugSong;
        
        const song = await Song.findOne({
            slug: slugSong
        });
        if(!song) return;
        const topic = await Topic.findOne({ 
            _id: song?.topicId

        }).select("title");
        
        //Like
        song.like = await Like.countDocuments({songId: song.id});
        if(res.locals.infoUser){
            song.isLiked = await Like.findOne({userId: res.locals.infoUser.id, songId: song.id}) ? "liked" : "unLiked";
        }else{
            song.isLiked = "notLogin" 
        }
        //End like 
        //favorite
        if(res.locals.infoUser){
            song.isFavorite = await FavoriteSong.findOne({userId: res.locals.infoUser.id, songId: song.id}) ? "remove" : "add";
        }else{
            song.isFavorite = "notLogin"
        }
        //end favorite
        //list comments
        const comments = await Comment.find({
            songId: song.id
        }).limit(5).sort({createdAt: "desc"})
        for(const item of comments){
            const infoUser = await User.findOne({
                _id: item.userId
            }).select("fullName avatar slug")
            item.infoUser = infoUser;
        }
        //end comments
        
        const single = await Single.findOne({
            _id: song?.singerId
        }).select("fullName")
        res.render("clients/pages/songs/detail.pug",{   
            pageTitle: song?.title,
            song: song,
            topic: topic,
            single: single,
            comments: comments
        })
    } catch (error) {
        console.log(error)
        
    }
    
}
//[PATCH] "/song/like/:status/:id"
export const like = async (req: Request, res: Response): Promise<void> =>{
    //status includes ["liked","unLiked"]
    const id = req.params.id;
    const status = req.params.status;
    try {

        if(status === "unLiked"){
            const body = {userId: res.locals.infoUser.id, songId: id};
            const like = new Like(body);
            await like.save();
            const likes = await Like.find({songId: id});
            res.status(200).json({success: true, message: "Thêm Like thành công", like: likes.length,status: status})
        }else if(status === "liked"){
            await Like.deleteOne({
                userId: res.locals.infoUser.id,
                songId: id
            })
            const likes = await Like.find({songId: id});
            res.status(200).json({success: true, message: "hủy Like thành công", like: likes.length, status: status})
        }else{
            res.status(400).json({suces: false, message: "Trạng thái không hợp lệ"})
        }
        

        
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: "Cập nhật like thất bại"})
    }
}
//[GET] "/songs/favorite"
export const favorite = async (req: Request, res: Response): Promise<void> =>{
    const FavoriteSongs = await FavoriteSong.find({
        userId: res.locals.infoUser.id
    });
    for(const item of FavoriteSongs){
        const infoSong = await Song.findOne({
            _id: item.songId
        })
        item.infoSong = infoSong
    }
    res.render("clients/pages/songs/favorites.pug",{
        Favorite: FavoriteSongs
    });
}
//[PATCH] "/songs/favorite/:status/:id"
export const favoritePatch = async (req: Request,res: Response): Promise<void> =>{
    //status includes [add, remove];
    const status = req.params.status;
    const id = req.params.id;

    if(status === "add"){
        const record = new FavoriteSong({songId: id,userId: res.locals.infoUser.id})
        await record.save();
        res.status(200).json({success: true, message: "Thêm vào danh sách bài hát yêu thích thành công"})
        
    }else if(status === "remove"){
        try {
            await FavoriteSong.deleteOne({songId: id,userId: res.locals.infoUser.id});
            res.status(200).json({success: true, message: "Xóa khỏi danh sách bài hát yêu thích thành công", status: status});
        } catch (error) {
            console.log(error);
            res.status(400).json({success: false,message: "Xóa khỏi danh sách bài hát yêu thích thất bại", status: status})
        }
        
    }
}
//[POST] "/songs/comments/add/:id"
export const addComment = async (req: Request, res: Response): Promise<void> =>{
    const userId: string = res.locals.infoUser.id;
    const content: string = req.body.content;
    const songId: string = req.params.id;
    try {
        const comment = new Comment({userId: userId,songId: songId, content: content});
        await comment.save();
        res.status(200).json({success: true, message: "Thêm bình luận thành công"})
    } catch (error) {
        res.status(400).json({success: false, message: "Lỗi không xác định"})
    }
}
//[PATCH] "/songs/listen/:id"
export const listen = async (req: Request, res: Response): Promise<void> =>{


    const id = req.params.id;
    try {
        const song = await Song.findOne({_id: id}).select("listen");
        if(typeof song?.listen !== 'number')return;
        const updateListen: number = song.listen + 1;
        await Song.updateOne({
            _id: id
        },{
            listen: updateListen
        })
        res.status(200).json({success: true, message: "Cập nhật số lượt nghe thành công", listens: updateListen})
    } catch (error) {
        res.status(400).json({success: false, message: "Cập nhật số Like thất bại"})
    }
}

