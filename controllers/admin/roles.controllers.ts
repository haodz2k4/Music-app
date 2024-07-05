
import {Request, Response} from 'express';
import Roles from '../../models/roles.model';
import { btnStatus } from '../../helpers/status.helper';
export const index = async (req: Request, res: Response) :Promise<void>  =>{


    //list btn filter 
    const listBtn = btnStatus(req);

    const roles = await Roles.find({
        deleted: false
    })
    res.render("admin/pages/roles/index.pug",{
        activePages: "roles",
        listBtn: listBtn,
        roles: roles
    })
}