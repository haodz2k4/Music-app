import { Request, Response } from "express";
import Role from '../../models/roles.model';
import Account from '../../models/accounts.model';
//[GET] "/admin/my-account"
export const index = async (req: Request, res: Response):Promise<void>  =>{

    const account = res.locals.account;
    const roles = await Role.find({
        deleted: false,
        status: "active"
    })
    const accounts = await Account.find({
        deleted: false,
        status: "active"
    })
    for(const item of accounts){
        const nameRole = await Role.findById(item.role_id);
        item.nameRole = nameRole?.title;
    }
    res.render("admin/pages/my-account/index.pug",{
        activePages: 'my-account',
        account,
        roles,
        accounts
    })
}