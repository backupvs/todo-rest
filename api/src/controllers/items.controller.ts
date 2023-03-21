import { Request, Response } from 'express';
import { ItemInterface } from '../types/item.interface';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { HttpError } from '../errors/http.error';
import { User } from '../models/User.model';
import { Item } from '../models/Item.model';

const findAll = async (req: Request, res: Response) => { // TODO PAGINATION
    const { items } = await User
        .findOne({
            _id: req.session.user._id
        })
        .select('items')
        .populate({ path: 'items' });

    res.status(200).json(items);
}

const create = async (req: Request, res: Response) => {
    const createItemDto: CreateItemDto = req.body;
    const item = await Item.create(createItemDto);

    await User.findOneAndUpdate(
        { _id: req.session.user._id },
        { $push: { items: item._id } },
        { new: true }
    )

    res.status(201).json(item);
}

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateItemDto: UpdateItemDto = req.body;

    const item: ItemInterface = await Item.findByIdAndUpdate(
        id,
        updateItemDto,
        { new: true }
    );

    if (!item) {
        throw new HttpError(404, 'Item with given ID was not found');
    }

    res.status(200).json(item);
}

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await Item.findOneAndDelete({ _id: id });

    if (!item) {
        throw new HttpError(404, 'Item with given ID was not found');
    }

    res.status(200).json(item);
}

export const itemsController = { findAll, create, update, remove };