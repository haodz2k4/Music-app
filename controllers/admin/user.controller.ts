import { Request, Response } from "express"

import User from '../../models/user.model';
//require helper
import { btnStatus } from "../../helpers/filter.helper"
//[GET] "/admin/users"
export const index = async (req: Request, res: Response) :Promise<void>  =>{

    const listBtn = btnStatus(req);
    const users = await User.find({
        deleted: false,
        status: "active"
    })
    res.render("admin/pages/user/index.pug",{
        activePages: "users",
        listBtn,
        users
    })
}