import { Schema, model } from "mongoose";

interface SettingGeneral {
    websiteName: string,
    logo: string,
    phone: string,
    email: string,
    address: string,
    copyright: string,
    createdBy: string,
    updatedBy: string
    createdAt: Date,
    updatedAt: Date
}

const settingGeneralSchema = new Schema<SettingGeneral>({
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String,
    createdBy: String,
    updatedBy: String

},{
    timestamps: true
})

export default model("setting-general",settingGeneralSchema,"settings-general");