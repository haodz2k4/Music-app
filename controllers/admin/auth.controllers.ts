import { Request, Response } from "express";
import Account from '../../models/accounts.model';
import system from '../../config/system';
const prefixAdmin = system.prefixAdmin;
//[GET] "/admin/auth/login"
export const login = (req: Request, res: Response) =>{
    res.render("admin/pages/auth/login.pug")
}
//[POST] "/admin/auth/login"
export const loginPost = (req: Request, res: Response) =>{
    const email = req.body.email;
    const password = req.body.password;
    const isExistsAccount = Account.findOne({
        email: email
    })
    res.redirect(`/${prefixAdmin}/dashboard`)
}