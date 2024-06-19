import { Schema, model } from "mongoose";
const favoriteSongSchema = new Schema({
    songId: String,
    userId: String,
    infoSong: Object
}, 
{
    timestamps: true
})
export default model("favorite",favoriteSongSchema,"favorites")