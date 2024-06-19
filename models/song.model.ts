import { Schema, model } from 'mongoose';

const songSchema: Schema = new Schema({
    title: {type: String, required: true},
    avatar: String,
    description: String,
    singerId: String,
    topicId: String,
    lyrics: String,
    audio: String,
    listen: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["active","inactive"],
        default: "active"

    },
    slug: String,
    deleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})  


export default model("song",songSchema,"songs");