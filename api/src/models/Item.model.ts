import { model, Schema } from 'mongoose';
import { ItemInterface } from '../types/item.interface';

export const Item = model<ItemInterface>('Item', new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        isDone: {
            type: Boolean,
            required: true
        },
    },
    { timestamps: true }
));