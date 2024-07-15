import { Request, Response, NextFunction } from "express";
import { Socket } from "socket.io";

export default async (req: Request, res: Response, next: NextFunction) :Promise<void> =>{

    _io.once('connection',(socket: Socket) =>{
        console.log("1 User connected"); 


        
    }) 
    console.log("run here")
    next();
}   