export class HttpError extends Error {
    readonly statusCode?: number;
    readonly details?: any[];

    constructor(statusCode?: number, message?: string, details?: any[]) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}