import { Request, Response, NextFunction } from "express";
import system from '../../config/system';
const prefixAdmin = system.prefixAdmin;

import jwt from "jsonwebtoken";
//require model 
import Account from '../../models/accounts.model';
import Role from '../../models/roles.model';
export const requireAuth = async (req: Request, res: Response, next: NextFunction) :Promise<void> =>{

    const tokenAccount = req.cookies.tokenAccount;
    if(!tokenAccount){
        req.flash('error_msg','Bạn chưa đăng nhập')
        res.redirect(`/${prefixAdmin}/auth/login`);
        return;
    }
    
    const account_secret: any = await jwt.verify(tokenAccount,process.env.JWT_SECRET as string);
    const account = await Account.findById(account_secret.account_id)
    //Role 
    const role = await Role.findById(account?.role_id);
    res.locals.role = role
    res.locals.account = account
    next();
}