import { Schema, model } from 'mongoose';
import slugify from 'slugify'
const userSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    description: String,
    email: String,
    birthDate: String,
    password: String,
    token: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    status: {type: String, enum: ["active","inactive"], default: "active"}

},{timestamps: true}
)

userSchema.pre("save",function (next) {
    if(this.isModified('fullName') && typeof this.fullName ==='string'){
        this.slug = slugify(this.fullName, {lower: true, strict: true})
    }
    next();
})

export default model("user",userSchema,"users");