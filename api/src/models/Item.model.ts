import { model, Schema } from 'mongoose';
import { ItemInterface } from '../types/item.interface';

export const Item = model<ItemInterface>('Item', new Schema(
    {
        description: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        },
    },
    { timestamps: true }
));