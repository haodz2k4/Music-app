import { Schema, model } from 'mongoose';

const followSchema = new Schema({
    userId: String,
    singerId: String,
    
},{
    timestamps: true
})

export default model("follow",followSchema,"follows")