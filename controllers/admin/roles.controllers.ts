
import {Request, Response} from 'express';
import Role from '../../models/roles.model';
import { btnStatus } from '../../helpers/status.helper';
import system from '../../config/system'; 

const prefixAdmin = system.prefixAdmin
//[GET] "/admin/roles"
export const index = async (req: Request, res: Response) :Promise<void>  =>{


    //list btn filter 
    const listBtn = btnStatus(req);
    const roles = await Role.find({
        deleted: false
    })
    res.render("admin/pages/roles/index.pug",{
        activePages: "roles",
        listBtn: listBtn,
        roles: roles
    })
}
//[GET] "/admin/roles/add"
export const add = async (req: Request,res: Response) : Promise<void> =>{
    res.render("admin/pages/roles/create.pug",{
        activePages: "roles"
    });
}
//[POST] "/admin/roles/add"
export const addPost = async (req: Request, res: Response) :Promise<void>  =>{4
    try {
        const role = new Role(req.body);
        await role.save();
        req.flash('success_msg','Thêm nhóm quyền thành công')
        res.redirect(`/${prefixAdmin}/roles`);
    } catch (error) {
        req.flash('error_msg','Thêm nhóm quyền thất bại')
        res.redirect("back");
    }
}