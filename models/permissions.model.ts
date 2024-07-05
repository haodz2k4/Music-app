import {Schema, model} from 'mongoose';
interface Permission {
    name: string
}
const permissionSchema = new Schema<Permission>({
    //name: roles_featured
    name: {
        type: String,
        unique: true
    }
},{
    timestamps: true
});
export default model("permission",permissionSchema,"permissions");