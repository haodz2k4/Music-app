import { Request, Response, NextFunction } from "express"
import Role from "../../models/roles.model";
export const checkPermission =  (name: string)=>{

    return (req: Request, res: Response, next: NextFunction) =>{

        


        next();
    }
}