import { Request, Response, NextFunction } from "express";
import system from '../../config/system';
const prefixAdmin = system.prefixAdmin;
//require model 
import Account from '../../models/accounts.model';
export const requireAuth = (req: Request, res: Response, next: NextFunction) =>{

    const tokenAccount = req.cookies.tokenAccount;
    if(!tokenAccount){
        req.flash('error_msg','Bạn chưa đăng nhập')
        res.redirect(`/${prefixAdmin}/auth/login`)
    }
    const isExistsToken = Account.findOne({
        token: tokenAccount
    })
    if(!isExistsToken){
        req.flash('error_msg','Tài khoản không hợp lệ')
        res.redirect(`/${prefixAdmin}/auth/login`)
    }
    next();
}