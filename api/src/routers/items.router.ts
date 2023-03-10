import { Router } from 'express';
import { itemsController } from '../controllers/items.controller';

export const itemsRouter = Router();

itemsRouter
    .get('/', itemsController.findAll)
    .post('/', itemsController.create)
    .patch('/:id', itemsController.update)
    .delete('/:id', itemsController.remove);