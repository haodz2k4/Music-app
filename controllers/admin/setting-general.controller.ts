import { Request, Response } from 'express';
import SettingGeneral  from '../../models/settings.model';
import Account from '../../models/accounts.model';
//[GET] "/admin/settings/general"
export const general = async  (req: Request, res: Response): Promise<void> =>{

    const settingGeneral = await SettingGeneral.findOne();
    const account = await Account.findById(settingGeneral?.updatedBy);
    const updatedBy = account?.fullName;
    res.render("admin/pages/setting-general/index.pug",{
        activePages: 'settings-general',
        settingGeneral,
        updatedBy
        
    });
}
//[PATCH] "/admin/settings/general"
export const generalPatch = async (req: Request, res: Response) :Promise<void>  =>{
    const settingeGeneral = await SettingGeneral.findOne();
    try {
        if(settingeGeneral){
            req.body.updatedBy = res.locals.account.id
            await SettingGeneral.updateOne({
                _id: settingeGeneral.id
            },req.body)
            
            req.flash('','Thêm cài đặt chung thanh công')
        }else{
            req.body.createdBy = res.locals.account.id
            const record = new SettingGeneral(req.body);
            await record.save();
            
            req.flash('','Thêm cài đặt chung thanh công')
        }
        res.redirect("back");
    } catch (error) {
        console.error(error);
    }
}