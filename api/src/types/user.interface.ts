import { Document } from "mongoose";

export interface UserInterface extends Document {
    readonly username: string;
    readonly password: string;
}