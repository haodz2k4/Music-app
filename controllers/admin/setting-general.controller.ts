import { Request, Response } from 'express';
import SettingGeneral  from '../../models/settings.model';
//[GET] "/admin/settings/general"
export const general = async  (req: Request, res: Response): Promise<void> =>{

    const settingGeneral = await SettingGeneral.findOne();
    res.render("admin/pages/setting-general/index.pug",{
        activePages: 'settings-general',
        settingGeneral
    });
}
