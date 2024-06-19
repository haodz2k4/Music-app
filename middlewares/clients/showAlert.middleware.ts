import { Request, Response, NextFunction } from "express"
export default (req: Request, res: Response, next:NextFunction): void =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
}