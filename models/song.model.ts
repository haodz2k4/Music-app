import { Schema, model } from 'mongoose';
import slugify from 'slugify';
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
songSchema.pre("save",function(next) {
    if(this.isModified("title") && typeof this.title ==='string'){
        this.slug = slugify(this.title);
    }

    next();
})

export default model("song",songSchema,"songs");