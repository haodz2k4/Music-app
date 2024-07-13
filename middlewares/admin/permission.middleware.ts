import { Request, Response, NextFunction } from "express"
import Role from "../../models/roles.model";
import system from '../../config/system';
const prefixAdmin = system.prefixAdmin;
export const checkPermission =  (name: string)=>{
    return (req: Request, res: Response, next: NextFunction) =>{
        const role = res.locals.role;
        const permissions: string[] = role.permissions;
        if(!permissions.includes(name)){
            res.redirect(`/${prefixAdmin}/auth/access/deny`);
            return;
        }

        next();
    }
}
export const checkPermissionApi = (name: string) =>{
    return (req: Request, res: Response, next: NextFunction) =>{
        const role = res.locals.role;
        const permissions: string[] = role.permissions
        if(!permissions.includes(name)){
            res.status(403).json({sucess: false, message: "Bạn Không đủ thẩm quyền"})
            return;
        }

        next();
    }
}