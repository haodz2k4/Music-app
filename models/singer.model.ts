import { Schema, model } from 'mongoose';
const singleSchema = new Schema({
    fullName: {type: String, required: true},
    avatar: String,
    description: String,
    slug: String,
    status: {
        type: String,
        enum: ["active","inactive"],
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
    timestamps: true
})

export default model("single",singleSchema,"singles")