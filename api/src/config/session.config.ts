import { ConnectMongoOptions } from "connect-mongo/build/main/lib/MongoStore";
import { SessionOptions } from "express-session";

export const sessionOptions: SessionOptions = {
    name: 'todo.sid',
    secret: process.env.SESSION_SECRET,
    cookie: {
        sameSite: 'strict' as const,
        secure: process.env.NODE_ENV === 'production',
        maxAge: +process.env.SESSION_COOKIE_MAX_AGE,
        httpOnly: true
    },
    resave: false,
    saveUninitialized: false,
};

export const storeConfig: ConnectMongoOptions = {
    mongoUrl: process.env.ATLAS_URI,
    collectionName: 'sessions',
    autoRemove: 'interval',
    autoRemoveInterval: 10 // minutes
}