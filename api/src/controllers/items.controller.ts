import { Request, Response } from 'express';
import { Item } from '../models/Item.model';
import { ItemInterface } from '../types/item.interface';
import { WrappedResponse } from '../models/WrappedResponse.model';
import { plainToInstance } from 'class-transformer';
import { CreateItemDto } from '../dto/create-item.dto';
import { validate } from 'class-validator';
import { UpdateItemDto } from '../dto/update-item.dto';

const findAll = async (req: Request, res: Response) => { // TODO PAGINATION
    try {
        const items: ItemInterface[] = await Item.find();
        new WrappedResponse(res).status(200).json(items);
    } catch (err) {
        throw err;
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const createItemDto = plainToInstance(CreateItemDto, req.body);
        const errors = await validate(createItemDto, { whitelist: true, forbidNonWhitelisted: true });
        
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const item = await new Item(createItemDto).save();
        res.status(200).json(item);
    } catch (err) {
        throw err;
    }
}

const update = async (req: Request, res: Response) => {
    try {
        const updateItemDto = plainToInstance(UpdateItemDto, req.body);
        const { id } = req.params;
        const errors = await validate(updateItemDto);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const item: ItemInterface = await Item.findByIdAndUpdate(
            id,
            updateItemDto, 
            { new: true }
        );
        res.status(200).json(item);
    } catch (err) {
        throw err;
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const item = await Item.findByIdAndRemove(id);

        new WrappedResponse(res).status(200).json(item);
    } catch (err) {
        throw err;
    }
}

export const itemsController = { findAll, create, update, remove };