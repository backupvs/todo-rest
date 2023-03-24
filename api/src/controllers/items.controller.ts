import { Request, Response } from 'express';
import { ItemInterface } from '../types/item.interface';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { HttpError } from '../errors/http.error';
import { User } from '../models/User.model';
import { Item } from '../models/Item.model';
import { PopulateOptions } from 'mongoose';

const findAll = async (req: Request, res: Response) => {
    const limit = +req.query.limit;
    const offset = +req.query.offset;
    const isDone = req.query.isDone;

    const populateOptions: PopulateOptions = {
        path: 'items', options: {
            limit,
            skip: offset,
            sort: { 'createdAt': -1 },
        },
    };

    if (isDone) {
        populateOptions.match = { isDone };
    }

    const { items } = await User
        .findOne({ _id: req.session.user._id })
        .populate(populateOptions)
        .select('items');

    res.status(200).json(items);
}

const create = async (req: Request, res: Response) => {
    const createItemDto: CreateItemDto = req.body;
    const item = await Item.create(createItemDto);

    await User.findOneAndUpdate(
        { _id: req.session.user._id },
        { $push: { items: item._id } },
        { new: true }
    );

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

const getTotalNumber = async (req: Request, res: Response) => {
    const user = await User
        .findOne({ _id: req.session.user._id });

    res.status(200).json(user.items.length);
}

export const itemsController = { findAll, create, update, remove, getTotalNumber };