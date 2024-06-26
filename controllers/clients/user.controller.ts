
import { Request, Response } from 'express';
import { hash, compare } from "bcrypt";
//require helper here
import {generateString} from '../../helpers/generate.helper'
//require model here
import User from '../../models/user.model';
import Like from '../../models/like.model';
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';
//[GET] "/user/login"
export const login = (req: Request, res: Response): void =>{
    res.render("clients/pages/user/login.pug")
}
//[GET] "/user/register"
export const register =  (req: Request, res: Response): void =>{
    res.render("clients/pages/user/register.pug")
}
//[POST] "/user/register"
export const registerPost = async (req: Request, res: Response): Promise<void> =>{
    try {
        req.body.token = generateString(30);
        req.body.password = await hash(req.body.password,10)
        const record = new User(req.body);
        await record.save();
        
        req.flash('success_msg', 'Đăng ký tài khoản thành công');
        res.redirect("/user/login");
    } catch (error) {
        req.flash('error_msg', 'Không thể tạo người dùng');
        res.redirect("back");
        console.log(error)
    }


}
//[POST] "/user/login"
export const loginPost = async (req: Request, res: Response): Promise<void> => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    try {
        const record = await User.findOne({
            email: email
        });

        if (!record) {
            req.flash('error_msg', 'Email không tồn tại');
            res.redirect("back");
            return;
        }

        if (typeof record.password === 'string') {
            const match: boolean = await compare(password, record.password);
            if (!match) {
                req.flash('error_msg', 'Mật khẩu không đúng');
                res.redirect("back");
                return;
            }
            res.cookie('userToken',record.token);
            req.flash('success_msg', 'Đăng nhập thành công');
            res.redirect("/topics");
            return;
        }
        req.flash('error_msg', 'Đã xảy ra lỗi với dữ liệu người dùng');
        res.redirect("back");

    } catch (error) {
        console.error('Lỗi khi đăng nhập:', error);
        req.flash('error_msg', 'Lỗi không xác định');
        res.redirect("back");
    }
};
//[GET] "/user/profiles"
export const profiles = async (req: Request,res: Response): Promise<void>=>{
    
    const infoUser = res.locals.infoUser;
    const likes = await Like.find({
        userId: infoUser.id
    })
    const listId = likes.map(item => item.songId);
    const songs = await Song.find({
        _id: {$in: listId}
    })
    for(const item of songs){
        const singer = await Singer.findOne({_id: item.singerId}).select("fullName");
        item.singerName = singer?.fullName;
    }
    res.render("clients/pages/user/profiles.pug",{
        user: infoUser,
        songs
    })
}
//[GET] "/user/edit"
export const edit = async (req: Request, res: Response) :Promise<void> =>{
    res.render("clients/pages/user/edit.pug")
}
//[PATCH] "/user/edit"
export const editPatch = async (req: Request, res: Response) :Promise<void> =>{
    try {
        console.log(req.body);
        const id = res.locals.infoUser.id;
        await User.updateOne({
            _id: id
        },req.body);
        req.flash('success_msg','chỉnh sửa thành công');
        res.redirect("/user/profiles");
    } catch (error) {
        req.flash('error_msg','chỉnh sửa thất bại');
        res.redirect("back");
    }
}