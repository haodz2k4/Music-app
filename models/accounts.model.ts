import { model, Schema } from 'mongoose'; 
interface Account {
    fullName: string,
    email: string,
    phone: string,
    description: string,
    token: string,
    password: string,
    role_id: string,
    gender: ('Nam'|'Nữ'),
    birthDate: Date,
    createdAt: Date,
    avatar: string,
    deleted: boolean,
    status: string,
    updatedAt: Date,
    nameRole?: string 
    
}
const accountSChema = new Schema<Account>({
    fullName: String,
    email: String,
    phone: String,
    description: String,
    token: String,
    avatar: String,
    password: String,
    role_id: String,
    gender: String,
    birthDate: Date,
    deleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "active"
    }
},{
    timestamps: true
})
export default model<Account>("account",accountSChema,"accounts")