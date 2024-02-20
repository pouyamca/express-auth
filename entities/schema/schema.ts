import { Schema } from "mongoose";



export const UserSchema: Schema = new Schema({
    universalId: { type: String, required: true },
    userName: { type: String, required: true },
    Password: { type: String, required: true },
    revokeOtp: { type: String, required: false },
});


