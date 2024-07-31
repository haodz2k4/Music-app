import { Request,Response, NextFunction } from "express";
import {verify} from "jsonwebtoken";
import User from '../../models/user.model';
export const infoUser = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    const verify_token: any = verify(req.cookies.userToken,process.env.JWT_SECRET as string)
    if(req.cookies.userToken){
        const user = await User.findOne({
            _id: verify_token.user_id,
            deleted: false,
            status: "active"
        })
        if(user){
            res.locals.infoUser = user;
        }
    }
    


    next();
}