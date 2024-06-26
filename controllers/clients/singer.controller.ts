
import {Request, Response} from 'express';
import Singer from '../../models/singer.model';
import Song from '../../models/song.model';
import Follow from '../../models/follow.model';
//[GET] "/singer"
export const index = async (req: Request, res: Response): Promise<void> => {
    const find = {
        status: "active",
        deleted: false
    }
    const singers = await Singer.find(find)
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
    
    
    res.render("clients/pages/singer/index.pug",{
        singers: singers
    });
} 
//[PATCH] "/singer/follow/edit/:status/:id" (api)
export const followPatch = async (req: Request, res: Response): Promise<void>  =>{
    //status include [followed, unfollow] 
    const status = req.params.status;
    const singerId = req.params.id;

    try {
        if(status === "unfollow"){
            const follow = new Follow({
                userId: res.locals.infoUser.id,
                singerId: singerId
            })
            await follow.save();
            const follows = await Follow.countDocuments({
                singerId: singerId
            })
            res.status(200).json({success: true, message: "Follow thành công",follows: follows})
        }else{
            await Follow.deleteOne({
                userId: res.locals.infoUser.id,
                singerId: singerId
            })
            const follows = await Follow.countDocuments({
                singerId: singerId
            })
            res.status(200).json({success: true, message: "Hủy Follow thành công", follows: follows})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: "Lỗi không xác định", error: error});
    }
} 
//[GET] "/singer/detail/:slug"
export const detail = async (req: Request, res: Response) :Promise<void> =>{
    const slug = req.params.slug;
    try {
        const singer = await Singer.findOne({
            slug: slug
        })
        if(!singer){
            res.status(404).render("clients/pages/errors/404.pug");
            return;
        }
        const songs = await Song.find({
            singerId: singer.id
        })
        res.render("clients/pages/singer/detail.pug",{
            singer: singer,
            songs: songs
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).render("clients/pages/error/500.pug ");
    }
}
