import { Request, Response, NextFunction } from 'express';
import Account from '../../models/accounts.model';
import Role from '../../models/roles.model';
//require utils 
import { isValidateBirthDate } from '../../utils/date.until';
export const add =async (req: Request, res: Response, next: NextFunction) :Promise<void> =>{
   
    const isExistsEmail = await Account.findOne({
        email: req.body.email
    })
    if(isExistsEmail){
        req.flash('error_msg','Email đã tốn tại');
        res.redirect("back");
        return;
    }
    const phone: string = req.body.phone;

    if(phone.length !== 10){
        req.flash('error_msg','Số điện thoại phải là 10 số');
        res.redirect("back");
        return;
    }
    const isExistsPhone = await Account.findOne({
        phone: phone
    })
    if(isExistsPhone){
        req.flash('error_msg','số điện thoại đã tồn tại');
        res.redirect("back");
        return;
    }
    const isExistsRoleId = await Role.findById(req.body.role_id);
    if(!isExistsRoleId){
        req.flash('error_msg','vai trò không tồn tại ');
        res.redirect("back");
        return;
    }
    if(!isValidateBirthDate(req.body.birthDate)){
        req.flash('error_msg','Ngày Sinh Không Hợp Lệ');
        res.redirect("back");
        return;
    }


    next();
}