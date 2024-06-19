import {Request, Response} from 'express';
import Singer from '../../models/singer.model';
//[GET] "/singer"
export const index = async (req: Request, res: Response): Promise<void> => {

    const singers = await Singer.find({
        status: "active",
        deleted: false
    })
    res.render("clients/pages/singer/index.pug",{
        singers: singers
    });
} 