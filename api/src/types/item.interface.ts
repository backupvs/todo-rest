import { Document } from 'mongoose';

export interface ItemInterface extends Document {
    readonly description: string;
    readonly status: boolean;
}