
import { Request } from "express";
import Song from '../models/song.model';
export const totalListen = async (req: Request) :Promise<number> =>{
    let sum: number = 0;
    const songs = await Song.find({
        deleted: false,
        status: "active"
    });
    for(const item of songs){
        if(typeof item.listen === 'number'){
            sum += item.listen;
        }
    }
    return sum;
}