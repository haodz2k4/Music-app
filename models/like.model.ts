import {Schema, model} from 'mongoose';
const likeSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    songId: {
        type: String,
        required: true
    },
    infoSong: Object

},{timestamps: true}
)

export default model("like",likeSchema,"likes");