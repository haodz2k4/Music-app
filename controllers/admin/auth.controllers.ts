import { Request, Response } from "express";
import {compare} from 'bcrypt';
import Account from '../../models/accounts.model';
import system from '../../config/system';
const prefixAdmin = system.prefixAdmin;
//[GET] "/admin/auth/login"
export const login = (req: Request, res: Response) =>{
    res.render("admin/pages/auth/login.pug")
}
//[POST] "/admin/auth/login"
export const loginPost = async (req: Request, res: Response) =>{
    const email: string = req.body.email;
    const password: string = req.body.password;
    try {
        const isExistsAccount = await Account.findOne({
            email: email
        })
    
        if(!isExistsAccount){
            req.flash('error_msg','Email Không Tồn Tại');
            res.redirect("back");
            return;
        }
        const isExistsPassword = compare(isExistsAccount.password,password);
        if(!isExistsPassword){
            req.flash('error_msg','Mật khẩu của bạn đã bị sai');
            res.redirect("back");
            return;
        }
        res.cookie("tokenAccount",isExistsAccount.token);
        res.redirect(`/${prefixAdmin}/dashboard`)
    } catch (error) {
        console.error(error);
        req.flash('error_msg','Lỗi Không xác định');
        res.redirect("back");
    }
    
}