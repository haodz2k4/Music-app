import { Request, Response } from 'express';
import User from '../../models/user.model';
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';
import Like from '../../models/like.model';
import Follow from '../../models/follow.model';
import Comment from '../../models/comment.model';
//require helper here
import { totalListen } from '../../helpers/Calculate.helper';
//require untils here
import { getDate } from '../../utils/date.until';
//[GET] "/admin/dashboard"
export const index = async (req: Request, res: Response) :Promise<void>=>{ 
    // Statistis
    interface Section {
        total: number,
        active: number,
        inactive: number,
        deleted: number

    }
    interface Interact {
        listen: number,
        like: number,
        follows: number,
        comments: number
    }
    interface Statistis {
        user: Section,
        song: Section,
        singer: Section,
        interact: Interact

    }
    interface Find {
        [key: string]: any
    }
    const date= req.query.statistis;
    const find: Find = {};
    if(typeof date === 'string'){
        switch (date) {
            case "day":
                find.createdAt = {
                    $gte: getDate(date).start,
                    $lte: getDate(date).end,
                };
            break;
            case "week":
                find.createdAt = {
                    $gte: getDate(date).start,
                    $lte: getDate(date).end,
                };
            break;
            case "month": 
                find.createdAt = {
                    $gte: getDate(date).start,
                    $lte: getDate(date).end,
                };
                break;
            case "year": 
                find.createdAt = {
                    $gte: getDate(date).start,
                    $lte: getDate(date).end,
                };
                break;
        }
    }
    const statistis: Statistis = {
        user: {
            total: await User.countDocuments({ ...find,deleted: false }),
            active: await User.countDocuments({...find, status: "active", deleted: false }),
            inactive: await User.countDocuments({...find, status: "inactive", deleted: false }),
            deleted: await User.countDocuments({ ...find,deleted: true })
        },
        song: {
            total: await Song.countDocuments({ ...find,deleted: false }),
            active: await Song.countDocuments({ ...find,status: "active", deleted: false }),
            inactive: await Song.countDocuments({...find, status: "inactive", deleted: false }),
            deleted: await Song.countDocuments({ ...find,deleted: true })
        },
        singer: {
            total: await Singer.countDocuments({ ...find,deleted: false }),
            active: await Singer.countDocuments({ ...find,status: "active", deleted: false }),
            inactive: await Singer.countDocuments({...find, status: "inactive", deleted: false }),
            deleted: await Singer.countDocuments({...find,deleted: true })
        },
        interact: {
            listen: await totalListen(req),
            like: await Like.countDocuments({...find}),
            follows: await Follow.countDocuments({...find}),
            comments: await Comment.countDocuments({...find})
        }
    }
    //end Statistis 

    const users = await User.find({
        deleted: false,
        status: "active"
    })
    res.render("admin/pages/dashboard/index.pug",{
        activePages: 'dashboard',
        statistis,
        users
    });
}
