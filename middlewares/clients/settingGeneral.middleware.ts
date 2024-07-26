import SettingGeneral from "../../models/settings.model";
import { Request, Response, NextFunction } from "express";
export const settingGeneral = async (req: Request, res: Response, next: NextFunction) :Promise<void> =>{
    const settingGenerals = await SettingGeneral.findOne({});

    res.locals.settingGenerals = settingGenerals;
    

    next();
}