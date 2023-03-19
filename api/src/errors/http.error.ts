export class HttpError extends Error {
    readonly statusCode: number;
    readonly details: any;

    constructor(message: string, statusCode: number, details: any = []) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}