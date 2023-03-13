import { Response } from 'express';

export class WrappedResponse {
    constructor(private res: Response) {}

    status(code: number) {
        this.res.status(code);
        return this;
    }

    json(body: any = '') {
        this.res.json({ data: body });
    }
}