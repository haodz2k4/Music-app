import { Schema, model } from 'mongoose';
const commentSchema = new Schema({
    userId: String,
    songId: String,
    content: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: Date.now()
    },
    infoUser: Object
}, {
    timestamps: true
})
export default model("comment",commentSchema,"comments");