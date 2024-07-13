import { Request, Response, NextFunction } from "express";
import system from '../../config/system';
const prefixAdmin = system.prefixAdmin;
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
    const isExistsToken = await Account.findOne({
        token: tokenAccount
    })
    if(!isExistsToken){
        req.flash('error_msg','Tài khoản không hợp lệ')
        res.redirect(`/${prefixAdmin}/auth/login`);
        return;
    }
    //Role 
    const role = await Role.findById(isExistsToken.role_id);
    
    res.locals.role = role
    res.locals.account = isExistsToken
    next();
}