
import {connect} from 'mongoose';
export const connectDB = async (): Promise<void> =>{
    try {
        await connect("mongodb+srv://hosonhao23052004:QgvSxVmmxGGPBs6U@sonhao.nzgggzz.mongodb.net/music-app");
        console.log("connect database successfull");
    } catch (error) {
        console.log("connect database failed");
        console.log(error);
    }
}