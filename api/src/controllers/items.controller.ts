import { Request, Response } from 'express';
import { Item } from '../models/Item.model';
import { ItemInterface } from '../types/item.interface';
import { WrappedResponse } from '../models/WrappedResponse.model';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { HttpError } from '../errors/http.error';

const findAll = async (req: Request, res: Response) => { // TODO PAGINATION
    const items: ItemInterface[] = await Item.find();
    new WrappedResponse(res).status(200).json(items);
}

const create = async (req: Request, res: Response) => {
    const createItemDto: CreateItemDto = req.body;
    const item = await new Item(createItemDto).save();
    new WrappedResponse(res).status(201).json(item);
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
        throw new HttpError('User with given ID was not found', 404);
    }
    new WrappedResponse(res).status(200).json(item);
}

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    const item = await Item.findByIdAndRemove(id);
    if (!item) {
        throw new HttpError('User with given ID was not found', 404);
    }
    new WrappedResponse(res).status(200).json(item);
}

export const itemsController = { findAll, create, update, remove };