import { Request, Response, NextFunction } from "express";
import {isEmail} from 'validator';
import User from '../../models/user.model';
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{

    if(!req.body.fullName){
        req.flash('error_msg','fullName không được vượt để trống');
        res.redirect("back");
        return;
    }
    if(req.body.fullName.length < 3){
        req.flash('error_msg','fullName không được vượt quá 3 ký tự');
        res.redirect("back");
        return;
    }
    if(!req.body.email){
        req.flash('error_msg','Mật khẩu không được để trống');
        res.redirect("back");
        return;
    }
    if(!isEmail(req.body.email)){
        req.flash('error_msg','Định dạng email không hợp lệ');
        res.redirect("back");
        return;
    }
    const isExistsEmail = await User.findOne({
        email: req.body.email
    })
    if(isExistsEmail){
        req.flash('error_msg','Email đã tồn tại');
        res.redirect("back");
        return;
    }
    if(!req.body.password){
        req.flash('error_msg','Mật khẩu không được để trống')
        res.redirect("back");
        return;

    }
    if(req.body.password !== req.body.repeatPassword){
        req.flash('error_msg','mật khẩu nhập lại không đúng ');
        res.redirect("back");
        return;
    }
    

    next();
}
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    if(!req.body.email){
        req.flash('error_msg','Vui lòng nhập email');
        res.redirect("back");
        return;
    }
    if(!isEmail(req.body.email)){
        req.flash('error_msg','Định dạn email không hợp lệ');
        res.redirect("back");
        return;
    }
    if(!req.body.password){
        req.flash('error_msg','Mật khẩu không được để trống');
        res.redirect("back");
        return;
    }



    next();
}