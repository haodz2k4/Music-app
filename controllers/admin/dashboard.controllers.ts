import { Request, Response } from 'express';
import User from '../../models/user.model';
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';
import Like from '../../models/like.model';
import Follow from '../../models/follow.model';
import Comment from '../../models/comment.model';
//require helper here
import { totalListen } from '../../helpers/Calculate.helper';
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
        status?: ('active' | 'inactive'),
        deleted?: boolean
    }
    const statistis: Statistis = {
        user: {
            total: await User.countDocuments({ deleted: false }),
            active: await User.countDocuments({ status: "active", deleted: false }),
            inactive: await User.countDocuments({ status: "inactive", deleted: false }),
            deleted: await User.countDocuments({ deleted: true })
        },
        song: {
            total: await Song.countDocuments({ deleted: false }),
            active: await Song.countDocuments({ status: "active", deleted: false }),
            inactive: await Song.countDocuments({ status: "inactive", deleted: false }),
            deleted: await Song.countDocuments({ deleted: true })
        },
        singer: {
            total: await Singer.countDocuments({ deleted: false }),
            active: await Singer.countDocuments({ status: "active", deleted: false }),
            inactive: await Singer.countDocuments({ status: "inactive", deleted: false }),
            deleted: await Singer.countDocuments({ deleted: true })
        },
        interact: {
            listen: await totalListen(req),
            like: await Like.countDocuments(),
            follows: await Follow.countDocuments(),
            comments: await Comment.countDocuments()
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
