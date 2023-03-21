import { Document } from "mongoose";
import { ItemInterface } from "./item.interface";

export interface UserInterface extends Document {
    readonly username: string;
    readonly password: string;
    readonly items: ItemInterface[];
}

export interface UserSessionObject {
    _id: string;
    username: string;
}