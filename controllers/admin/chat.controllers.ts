import { Request, Response } from 'express';
import Chat from '../../models/chat.model';
export const index = async (req: Request, res: Response) :Promise<void>  =>{

    res.render("admin/pages/chat/index.pug",{
        activePages: 'chats '
    })
}