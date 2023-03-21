import { Router } from 'express';
import { itemsController } from '../controllers/items.controller';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { checkSession } from '../middlewares/check-session.middleware';
import { dtoValidator } from '../middlewares/dto-validator.middleware';
import { idValidator } from '../middlewares/id-validator.middleware';

export const itemsRouter = Router();

itemsRouter.use(checkSession);

itemsRouter
    .get('/', itemsController.findAll)
    .post('/', dtoValidator(CreateItemDto), itemsController.create)
    .patch('/:id', dtoValidator(UpdateItemDto), idValidator, itemsController.update)
    .delete('/:id', idValidator, itemsController.remove);