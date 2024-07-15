import {Request, Response} from 'express';
import {hash} from 'bcrypt';
import Account from '../../models/accounts.model';
import Role from '../../models/roles.model';
//require helper
import {btnStatus} from '../../helpers/filter.helper';
import system from '../../config/system';
import { generateString } from '../../helpers/generate.helper';
//[GET] "/admin/accounts"
export const index = async (req: Request, res: Response) :Promise<void> =>{
    const listBtn = btnStatus(req);
    const accounts = await Account.find({deleted: false});
    for(const item of accounts){
        item.nameRole =  (await Role.findById(item.role_id))?.title;
    }
    res.render("admin/pages/accounts/index.pug",{
        activePages: "accounts",
        listBtn,
        accounts
    })
}
//[GET] "/admin/accounts/add"
export const add = async (req: Request, res: Response) :Promise<void> =>{
    const roles = await Role.find({
        deleted: false,
        status: "active"
    })
    res.render("admin/pages/accounts/create.pug",{
        activePages: "accounts",
        roles
    })
}
//[POST] "/admin/accounts/add"
export const addPost = async (req: Request, res: Response) :Promise<void> =>{ 
    const prefixAdmin = system.prefixAdmin;
    req.body.token = generateString(30);
    req.body.password = await hash(req.body.password,10);
    try {
        const account = new Account(req.body);
        await account.save();
        
        req.flash('success_msg','Thêm tài khoản thành công');
        res.redirect(`/${prefixAdmin}/accounts`);
    } catch (error) {
        req.flash('error_msg','Thêm tài khoản thất bại')
        res.redirect("back");
    }
    
}
