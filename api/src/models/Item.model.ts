import { model, Schema } from 'mongoose';
import { ItemInterface } from '../types/item.interface';
import { User } from './User.model';

export const itemSchema = new Schema<ItemInterface>(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        isDone: {
            type: Boolean,
            index: true
        },
    },
    { timestamps: true }
);

itemSchema.pre<any>('findOneAndDelete', async function (next) {
    try {
        const itemId = this._conditions._id;
        await User.updateOne(
            { items: itemId },
            { $pull: { items: itemId } },
        );
        next();
    } catch (err) {
        if (err instanceof Error) {
            return next(err as NativeError);
        }
        next(new Error('Unknown error'))
    }
});

export const Item = model<ItemInterface>('Item', itemSchema);