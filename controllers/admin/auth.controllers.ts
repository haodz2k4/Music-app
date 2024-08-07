import { Request, Response } from "express";
import {compare} from 'bcrypt';
import Account from '../../models/accounts.model';
import system from '../../config/system'; 
import jwt from "jsonwebtoken";
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
        const token = jwt.sign({account_id: isExistsAccount.id},process.env.JWT_SECRET as string,{expiresIn: '30m'})
        res.cookie("tokenAccount",token);
        res.redirect(`/${prefixAdmin}/dashboard`)
    } catch (error) {
        console.error(error);
        req.flash('error_msg','Lỗi Không xác định');
        res.redirect("back");
    }
    
}
//[GET] "/admin/auth/logout"
export const logout = async (req: Request, res: Response) =>{

    res.clearCookie("tokenAccount");
    res.redirect(`/${prefixAdmin}/auth/login`);
}
//[GET] "/admin/auth/access/deny"
export const accessDeny = (req: Request, res: Response) : void =>{
    res.render("admin/pages/auth/access-deny.pug")
}