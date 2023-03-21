import { model, Schema } from "mongoose";
import { ItemInterface } from "../types/item.interface";
import { UserInterface } from "../types/user.interface";

const userSchema = new Schema<UserInterface>(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        items: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            }
        ]
    }
)

export const User = model<UserInterface>('User', userSchema);