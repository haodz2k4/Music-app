import {Schema, model} from 'mongoose';
interface Role {
    title: string,
    description: string,
    deleted: boolean,
    status: ("active" | "inactive"),
    permissions?: string[]
}
const roleSchema = new Schema<Role>({
    title: String,
    description: String,
    permissions: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true
})

export default model<Role>("role",roleSchema,"roles")