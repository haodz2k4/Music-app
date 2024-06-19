import { Request, Response, NextFunction } from "express";
import Like from '../../models/like.model';
import FavoriteSong from '../../models/favorite-song.model';
export const validateLike = async (req: Request, res: Response, next: NextFunction):Promise<void> =>{
    const isExistsLike = await Like.findOne({userId: res.locals.infoUser.id, songId: req.params.id});

    if(!isExistsLike){
        req.params.status = "unLiked"
    }else{
        req.params.status = "liked"
    }

    next();
}
export const validateFavorite = async (req: Request,res: Response, next: NextFunction) :Promise<void> =>{
    
    const isExistsFavorite = await FavoriteSong.findOne({
        userId: res.locals.infoUser.id,
        songId: req.params.id
    })
    if(!isExistsFavorite){
        req.params.status ="add"
    }else{
        req.params.status ="remove"
    }

    next();
}
export const validateAddComment = async (req: Request, res: Response, next: NextFunction) :Promise<void> =>{ 
    if(req.body.content.length < 3){
        res.status(400).json({success: false, message: "Nội dung không được dưới 3 ký tự"});
        return;
    }
    if(!req.body.content){
        res.status(400).json({success: false, message: "Nội dung không được để trống"});
        return;
    }


    next();

}