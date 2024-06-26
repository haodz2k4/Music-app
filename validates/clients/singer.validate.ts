
import { Request, Response, NextFunction } from "express";
export const followPatch = (req: Request, res: Response, next: NextFunction) :void =>{
   const isValidStatus: string[] = ["followed","unfollow"];
   const status = req.params.status;

   if(!isValidStatus.includes(status)){
        res.status(400).json({
            success: false, message: "Vui lòng kiểm tra lại định dạng trạng thái"
        })
   }
   next();
    
}