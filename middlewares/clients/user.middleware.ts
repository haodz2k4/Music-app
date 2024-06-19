import { Request,Response, NextFunction } from "express";
import User from '../../models/user.model';
export const infoUser = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{

    if(req.cookies.userToken){
        const user = await User.findOne({
            token: req.cookies.userToken,
            deleted: false,
            status: "active"
        })
        if(user){
            res.locals.infoUser = user;
        }
    }
    


    next();
}