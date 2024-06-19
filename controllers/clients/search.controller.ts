import { Request, Response } from "express";
//require helper here
import { normalizeString } from './../../helpers/normalizeString .helper';
//require model here
import Song from '../../models/song.model';
import Like from '../../models/like.model';
import Single from '../../models/singer.model';

import {helperFind} from '../../helpers/search.helper'; 
//[GET] "/search/result"
export const result = async (req: Request, res: Response):Promise<void> =>{
   const objectFind = helperFind(req)
    
    const songs = await Song.find(objectFind)

    for(const item of songs){
        item.like = await Like.countDocuments({songId: item.id});
        const singleName = await Single.findOne({_id: item.singerId}).select("fullName");
        item.singleName = singleName?.fullName
    }
    res.render("clients/pages/search/result.pug",{
        pageTitle: "Kết quả " + req.query.keyword,
        keyword: req.query.keyword,
        songs: songs
    })
}
//[GET] "/search/suggestion" (api)
export const suggestion = async (req: Request, res: Response): Promise<void> =>{
    const objectFind = helperFind(req);

    const songs = await Song.find(objectFind).limit(5);
    res.status(200).json({
        songs: songs,
        counts: songs.length
    })
}