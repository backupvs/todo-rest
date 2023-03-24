import { Router } from 'express';
import { itemsController } from '../controllers/items.controller';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { checkSession } from '../middlewares/check-session.middleware';
import { dtoValidator } from '../middlewares/dto-validator.middleware';
import { filterValidator } from '../middlewares/filter-validator.middleware';
import { idValidator } from '../middlewares/id-validator.middleware';
import { paginationValidator } from '../middlewares/pagination-validator.middleware';

export const itemsRouter = Router();

itemsRouter.use(checkSession);

itemsRouter
    .get('/',
        paginationValidator,
        filterValidator,
        itemsController.findAll
    );

itemsRouter
    .post('/',
        dtoValidator(CreateItemDto),
        itemsController.create
    );

itemsRouter
    .patch('/:id',
        dtoValidator(UpdateItemDto),
        idValidator,
        itemsController.update
    );

itemsRouter
    .delete('/:id',
        idValidator,
        itemsController.remove
    );

itemsRouter
    .get('/total',
        itemsController.getTotalNumber
    );