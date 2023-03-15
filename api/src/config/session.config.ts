export const sessionOptions = {
    name: 'todo.sid',
    secret: process.env.SESSION_SECRET,
    cookie: {
        sameSite: 'strict' as const,
        secure: process.env.NODE_ENV === 'production',
        maxAge: +process.env.SESSION_COOKIE_MAX_AGE
    },
    resave: false,
    saveUninitialized: false,
};

export const storeConfig = {
    uri: process.env.ATLAS_URI,
    collection: 'sessions'
}