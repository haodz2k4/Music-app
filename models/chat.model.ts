import { Schema, model } from "mongoose";

interface Chat {
    user_id: string,
    content: string,
    deleted: boolean,
    deleteddAt: Date
}

const chatSchema = new Schema<Chat>({
    user_id: String,
    content: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteddAt: Date
}) 

export default model<Chat>("chat",chatSchema,"chats");