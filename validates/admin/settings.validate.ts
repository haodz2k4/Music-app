import { Request, Response, NextFunction } from "express";
import {isEmail} from 'validator';
export const generalPatch = (req: Request, res: Response, next: NextFunction) =>{

    if(req.body.phone.length != 10){
        req.flash('error_msg','Số điện thoại phải là 10 số');
        res.redirect("back");
        return;
    }
    if(!isEmail(req.body.email)){
        req.flash('error_msg','Email định dạng không hợp lệ');
        res.redirect("back");
        return;
    }


    next();
}