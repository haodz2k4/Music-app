import { Schema, model } from "mongoose";
const topicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    avatar: String,
    description: String,
    status: {
        type: String,
        enum: ["active","inactive"]
    },
    deleted: {
        type: Boolean,
        default: false
    },
    slug: String
}, {
    timestamps: true
})
export default model("topic",topicSchema,"topics");