
import { Request, Response, NextFunction } from "express";
import User from '../../models/user.model';
import jwt from "jsonwebtoken";
export const requireAuth= async (req: Request, res: Response,next: NextFunction):Promise<void> =>{
    
    
    if(!req.cookies.userToken){
        req.flash('error_msg','Bạn chưa đăng nhập');
        res.redirect("/user/login");
        return;

    }
    const verify_token: any = jwt.verify(req.cookies.userToken,process.env.JWT_SECRET as string);
    const isExistsToken = await User.findOne({
        _id: verify_token.user_id,
        deleted: false,
        status: "active"
    })
    if(!isExistsToken){
        req.flash('error_msg','Bạn chưa đăng nhập');
        res.redirect("/user/login");
        return;
    }

    next();
}

export const requireAuthApi  = async (req: Request, res: Response,next: NextFunction):Promise<void> =>{
    
    if(!req.headers.authorization){
        res.status(401).json({sucess: false, message: "Vui lòng gửi kèm token"});
        return;
    }
    const token: string = req.headers.authorization?.split(" ")[1];
    const isExsitsToken = await User.findOne({
        token: token,
        deleted: false,
        status: "active"
    })
    if(!isExsitsToken){
        res.status(401).json({success: false, message: "Token không hợp lệ"});
        return;
    }

    next();
}