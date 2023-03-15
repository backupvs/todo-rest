import { model, Schema } from "mongoose";
import { UserInterface } from "../types/user.interface";

export const User = model<UserInterface>('User', new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
));

