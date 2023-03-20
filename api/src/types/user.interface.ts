import { Document } from "mongoose";

export interface UserInterface extends Document {
    readonly username: string;
    readonly password: string;
}

export interface UserSessionObject {
    _id: string;
    username: string;
}