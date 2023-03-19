import 'dotenv/config';
import 'express-async-errors';
import { sessionOptions, storeConfig } from './config/session.config';
import { corsOptions } from './config/cors.config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import { connectDB } from './database/db.connection';
import { itemsRouter } from './routers/items.router';
import { authRouter } from './routers/auth.router';
import { errorHandler } from './middlewares/error-handler.middleware';

const PORT = process.env.PORT || 3001;
const app = express();

// Connect to database
connectDB();

// CORS
app.use(cors(corsOptions));

// Middlewares
app.use(bodyParser.json());

// Sessions
const MongoDBStore = connectMongoDBSession(session);
app.use(session({
    ...sessionOptions,
    store: new MongoDBStore(storeConfig)
}));

// Routers
app.use('/api/items', itemsRouter);
app.use('/api/auth', authRouter);

// Error handler
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});