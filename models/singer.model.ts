import { Schema, model } from 'mongoose';
import slugify from 'slugify';
interface Singer{
    fullName: string,
    avatar?: string,
    description?: string,
    slug: string,
    status: "active" | "inactive";
    deleted: boolean,
    deletedAt?: Date,
    songCount?: number,
    followCount?: number;
    isFollowed?: string
    createdAt: Date,
    updatedAt: Date

}

const singleSchema = new Schema<Singer>({
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

//middleware here 
singleSchema.pre("save",function (next){
    if(this.isModified("fullName")){
        this.slug = slugify(this.fullName);
    }

    next();
})
export default model<Singer>("single",singleSchema,"singles")