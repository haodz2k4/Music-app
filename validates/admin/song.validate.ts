import { Request, Response, NextFunction } from "express";
//require model here
import Singer from '../../models/singer.model';
import Topic from '../../models/topics.model';
export const createSong = async (req: Request, res: Response, next: NextFunction) :Promise<void>  =>{
    if(!req.body.title){
        req.flash('error_msg','Vui lòng không bỏ trống được tiêu đề')
        res.redirect("back");
        return;
    }
    if(req.body.description.length < 5){
        req.flash('error_msg','Tie')
        res.redirect("back");
        return;

    }
    const isExistsSinger = await Singer.findOne({
        _id: req.body.singerId
    })
    if(!isExistsSinger){
        req.flash('error_msg','Ca sĩ không tồn tại')
        res.redirect("back");
        return;
    }
    const isExistsTopic = await Topic.findOne({
        _id: req.body.topicId
    })
    if(!isExistsTopic){
        req.flash('error_msg','Chủ đề không tồn tại')
        res.redirect("back");
        return;
    }
     
    if(req.body.listen < 0){
        req.flash('error_msg','Lượt nghe không được là số âm');
        res.redirect("back");
        return;
    }
    next();
}

export const editSong = async (req: Request, res: Response, next: NextFunction) :Promise<void> =>{
    if(!req.body.title){
        req.flash('error_msg','Vui lòng không bỏ trống được tiêu đề')
        res.redirect("back");
        return;
    }
    if(req.body.description.length < 5){
        req.flash('error_msg','Tie')
        res.redirect("back");
        return;

    }
    const isExistsSinger = await Singer.findOne({
        _id: req.body.singerId
    })
    if(!isExistsSinger){
        req.flash('error_msg','Ca sĩ không tồn tại')
        res.redirect("back");
        return;
    }
    const isExistsTopic = await Topic.findOne({
        _id: req.body.topicId
    })
    if(!isExistsTopic){
        req.flash('error_msg','Chủ đề không tồn tại')
        res.redirect("back");
        return;
    }
     
    if(req.body.listen < 0){
        req.flash('error_msg','Lượt nghe không được là số âm');
        res.redirect("back");
        return;
    }

    next();
}