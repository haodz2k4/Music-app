import { Request, Response } from "express";
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';
import Like from '../../models/like.model';
import Topic from '../../models/topics.model';
import Follow from '../../models/follow.model';
//[GET] "/"
export const index = async (req: Request, res: Response) :Promise<void> =>{
    interface Limit {
        songs: number,
        topics: number,
        singers: number
    }
    const Limit: Limit = {
        songs : 4,
        topics: 4,
        singers: 4
    }
    if(typeof req.query["limit-songs"] === 'string'){
        Limit.songs = parseInt(req.query["limit-songs"])    

    }
    if(typeof req.query["limit-topics"] === 'string'){
        Limit.topics = parseInt(req.query["limit-topics"]);
    }
    if(typeof req.query["limit-singers"] === 'string'){
        Limit.singers = parseInt(req.query["limit-singers"]);
    }
    //new songs
    const newSongs = await Song.find({
        deleted: false
    }).sort({createdAt: "desc"}).limit(Limit.songs);
    for(const item of newSongs){
        item.like = await Like.countDocuments({songId: item.id})
        const singleName = await Singer.findOne({_id: item.singerId}).select("fullName");
        item.singleName = singleName?.fullName
    }
    //end new song  
    //topics 
    const topics = await Topic.find({
        deleted: false,
        status: "active"
    }).limit(Limit.topics);
    //end topics 
    
    //single 
    const singers = await Singer.find({deleted: false, status: "active"}).limit(Limit.singers);
    for(const item of singers){
        item.songCount = await Song.countDocuments({
            singerId: item.id 
        });
        item.followCount = await Follow.countDocuments({
            singerId: item.id
        });
        item.isFollowed = await Follow.findOne({
            userId: res.locals.infoUser.id,
            singerId: item.id
        }) ? "followed" : "unfollow"
    }
    //end single 
    
    res.render("clients/pages/home/index.pug",{
        newSongs: newSongs,
        topics: topics,
        singers: singers
    });
}